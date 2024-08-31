import uuid
from .gpt_model_utility import chat, vectorize_message
from .gpt_model_utility import summary as gpt_summary
import json
import httpx
import asyncio
import pytz
from fastapi import HTTPException
from .models import Message, Conversation
from .schemas import MessageCreate
from .stt_connection import get_jwt_token
from sqlalchemy.orm import Session
from datetime import date, datetime
from .pinecone import init_pinecone
from .models import HomeInfo
from members.models import User

# Pinecone 인덱스를 전역적으로 초기화
pinecone_index = init_pinecone(dimension=768)

def get_similar_response(message: str) -> str or None:
    message_vector = vectorize_message(message)  # 메시지를 벡터로 변환

    # Pinecone 데이터베이스에서 유사한 항목 검색
    results = pinecone_index.query(vector=message_vector.tolist(), top_k=3, include_metadata=True)

    print(f"Query results: {results}")

    # 결과가 존재하고 메타데이터가 포함되어 있는지 확인
    if results['matches'] and 'metadata' in results['matches'][0]:
        # 가장 유사한 항목의 유사도 점수가 0.6 이상인 경우 응답 반환
        if results['matches'][0]['score'] > 0.6:
            return results['matches'][0]['metadata']['response']
    return None

def store_response(message: str, response: str):
    message_vector = vectorize_message(message)
    vector_id = str(uuid.uuid4())
    pinecone_index.upsert(vectors=[{"id": vector_id, "values": message_vector.tolist(), "metadata": {"response": response, "original_text": message}}])

    print(f"Stored vector ID: {vector_id}")
    print(f"Original text: {message}")
    print(f"Response: {response}")

#대화 내용 저장
def create_message(user: int, content: str, voice_url: str, speaker: str, db: Session) -> str:
    today = date.today()

    # 해당 유저와 오늘 날짜에 해당하는 Conversation이 있는지 확인
    conversation = db.query(Conversation).filter_by(user=user, date=today).first()

    # Conversation이 없으면 새로 생성
    if conversation is None:
        conversation = Conversation(user=user, date=today, summary=None)
        db.add(conversation)
        db.commit()

    korea_tz = pytz.timezone('Asia/Seoul')
    current_time_korea = datetime.now(korea_tz)

    # Message 객체 생성
    new_message = Message(
        conversation_id=conversation.id,
        time=current_time_korea,
        speaker=speaker,
        content=content,
        voice=voice_url
    )

    db.add(new_message)
    db.commit()

    return new_message.id

#사용자, 날짜 정보를 통해 대화 데이터를 반환
def get_messages(db: Session, user: int, date: str):
    try:
        date_object = datetime.strptime(date, "%Y-%m-%d").date()  # date를 파이썬의 datetime.date 객체로 변환

        # 사용자와 날짜에 해당하는 Conversation 찾기
        conversation = db.query(Conversation).filter(
            Conversation.user == user,
            Conversation.date == date_object
        ).first()

        results = []
        if conversation:
            messages = db.query(Message).filter(Message.conversation_id == conversation.id).all()
            results = [{
                "speaker": message.speaker,
                "content": message.content,
                "time": message.time,
                "voice": message.voice
            } for message in messages]
            return results  # 메시지 목록을 JSON 배열 형태로 반환
        else:
            return "해당 날짜에 대한 대화 데이터가 존재하지 않습니다."

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def transcribe_audio(file):
    url = "https://openapi.vito.ai/v1/transcribe"
    token = get_jwt_token()
    if not token:
        raise HTTPException(status_code=500, detail="JWT Token is not available")

    headers = {"Authorization": f"Bearer {token}"}
    config = {}

    file_content = await file.read()
    files = {
        'file': (file.filename, file_content, file.content_type)
    }

    async with httpx.AsyncClient() as client:
        post_response = await client.post(url, headers=headers, data={'config': json.dumps(config)}, files=files)
        post_response.raise_for_status()
        transcribe_id = post_response.json().get('id')

        if not transcribe_id:
            raise HTTPException(status_code=500, detail="Failed to obtain transcribe ID")

        # Polling loop
        while True:
            get_response = await client.get(
                f'https://openapi.vito.ai/v1/transcribe/{transcribe_id}',
                headers=headers
            )
            get_response.raise_for_status()
            result = get_response.json()

            if result['status'] == 'completed' or result['status'] == 'failed':
                return result  # 종료 조건: 최종 상태에 도달
            else:
                await asyncio.sleep(5)  # 5초 동안 대기 후 다시 확인

        return result

def create_summary(db: Session, user: int, date: str):
    conversation = db.query(Conversation).filter(
        Conversation.user == user,
        Conversation.date == date
    ).first()

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    #user의 content만 summary로 전달
    messages = db.query(Message).filter(
        Message.conversation_id == conversation.id,
        Message.speaker == "user"
    ).all()

    if not messages:
        raise HTTPException(status_code=404, detail="No messages found for the user's message")

    # 메시지 내용을 JSON 배열 형태로 만들기
    messages_json = [msg.content for msg in messages]

    # JSON 배열을 문자열로 변환
    messages_str = json.dumps(messages_json, ensure_ascii=False)

    # 대화 요약 생성
    summary = gpt_summary(message=messages_str, user_id=user, db=db)

    # 오늘 날짜가 아닌 경우만 저장
    today = datetime.today().strftime('%Y-%m-%d')
    if date != today:
        # 요약을 Conversation 객체에 저장
        conversation.summary = summary
        db.commit()

    return {"summary": summary}

def get_summary(db: Session, user: int, date_str: str):
    # 문자열로 된 날짜를 date 객체로 변환
    target_date = datetime.strptime(date_str, "%Y-%m-%d").date()

    conversation = db.query(Conversation).filter(
        Conversation.user == user,
        Conversation.date == date_str
    ).first()

    # 오늘 날짜를 구함
    today = date.today()

    # 대화 요약이 있고, 요청된 날짜가 오늘 이전인 경우
    if conversation and conversation.summary and target_date < today:
        return {"summary": conversation.summary}

    # 요약이 없거나, 날짜가 오늘 날짜인 경우 새로운 요약 생성
    return create_summary(db=db, user=user, date=date_str)


# MySQL의 user_id를 사용해 Pinecone에 집 정보를 저장하는 함수
def add_home_info(user_id: int, info: str, db: Session) -> HomeInfo:
    # 집 정보를 벡터화
    vector = vectorize_message(info)

    # 벡터를 Pinecone에 저장할 때 user_id와 info를 메타데이터에 포함
    vector_id = f"home_info_{user_id}_{uuid.uuid4()}"  # 유저마다 고유한 벡터 ID
    metadata = {
        "user_id": user_id,
        "info": info
    }

    pinecone_index.upsert([(vector_id, vector.tolist(), metadata)])

    # MySQL에도 벡터 ID와 집 정보를 저장
    home_info = HomeInfo(user_id=user_id, info=info, pinecone_vector_id=vector_id)
    db.add(home_info)
    db.commit()
    db.refresh(home_info)

    return home_info

# Pinecone에서 MySQL의 user_id를 기반으로 집 정보를 가져오는 함수
def get_home_info(user_id: int, db: Session) -> dict:
    # MySQL에서 벡터 ID를 가져옴
    home_info = db.query(HomeInfo).filter(HomeInfo.user_id == user_id).first()
    if not home_info:
        return None

    vector_id = home_info.pinecone_vector_id

    # Pinecone에서 user_id를 기반으로 벡터 검색
    query_vector = vectorize_message(home_info.info)
    result = pinecone_index.query(
        vector=query_vector.tolist(),
        top_k=1,
        include_metadata=True,
        filter={"user_id": user_id}  # user_id 필터 적용
    )

    if result['matches']:
        return {"info": result['matches'][0]['metadata']['info']}
    else:
        return {"info": "No matching home info found for the user."}

# Pinecone에서 MySQL의 user_id를 기반으로 집 정보를 수정하는 함수
def update_home_info(user_id: int, info: str, vector_id: str, db: Session):
    # MySQL에서 벡터 ID로 정보 찾기
    home_info = db.query(HomeInfo).filter(HomeInfo.user_id == user_id, HomeInfo.pinecone_vector_id == vector_id).first()

    if home_info:
        # Pinecone에서 정보 업데이트
        vector = vectorize_message(info)
        metadata = {
            "user_id": user_id,
            "info": info
        }
        pinecone_index.upsert([(vector_id, vector, metadata)])

        # MySQL에서도 정보 업데이트
        home_info.info = info
        db.commit()
        db.refresh(home_info)

        return home_info
    else:
        raise Exception("No home information found to update.")

# Pinecone에서 MySQL의 user_id를 기반으로 집 정보를 삭제하는 함수
def delete_home_info(user_id: int, vector_id: str, db: Session):
    # MySQL에서 벡터 ID로 정보 찾기
    home_info = db.query(HomeInfo).filter(HomeInfo.user_id == user_id, HomeInfo.pinecone_vector_id == vector_id).first()

    if home_info:
        # Pinecone에서 해당 벡터 삭제
        pinecone_index.delete(ids=[vector_id])

        # MySQL에서도 정보 삭제
        db.delete(home_info)
        db.commit()

        return {"message": "Home information deleted successfully"}
    else:
        raise Exception("No home information found to delete.")
