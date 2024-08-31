import io
import re
import tempfile
from collections import deque

from fastapi import Query, APIRouter, HTTPException, File, UploadFile, Form, Depends
from starlette import status
from sqlalchemy.orm import Session
from .services import *
from .schemas import Chat, HomeInfoRequest
from .services import create_message, transcribe_audio, add_home_info, get_home_info, update_home_info, delete_home_info
from .tts_connection import text_to_speech
from s3_connection import upload_file_to_s3
from mysql_connection import get_db
from jwt_utils import get_current_user
from .gpt_model_utility import chat  # 수정: chat 임포트
from emotions.services import classify_emotion
from talk.services import send_kakao_message

router = APIRouter(prefix="/api/v1")

# Pinecone 인덱스 초기화
pinecone_index = init_pinecone()

# 사용자별 대화 내역 저장을 위한 전역 변수 초기화
user_conversations = {}

@router.post("/chat/dodam")
async def chat_api(message: Chat, db: Session = Depends(get_db), current_user_id: int = Depends(get_current_user)):
    try:
        # 사용자별 대화 내역 가져오기, 없으면 deque 생성
        if current_user_id not in user_conversations:
            user_conversations[current_user_id] = deque(maxlen=10)

        # chat 함수 호출 시 current_user_id와 db, 그리고 대화 내역을 전달합니다.
        response_text, updated_messages = chat(message.message, current_user_id, db, user_conversations[current_user_id], pinecone_index)

        # 대화 내역 업데이트
        user_conversations[current_user_id] = updated_messages

        # response를 TTS화 하는 과정
        speech_stream = text_to_speech(gpt_message=response_text, user=current_user_id, db=db)
        if not speech_stream:
            raise HTTPException(status_code=500, detail="Failed to generate speech")

        # TTS한 mp3를 S3에 업로드하고 URL을 받아오는 과정
        unique_filename = f"{uuid.uuid4()}.mp3"
        upload_result = upload_file_to_s3(speech_stream, unique_filename)
        if upload_result.get("message") != "File uploaded successfully":
            error_message = upload_result.get("message", "An unexpected error occurred during file upload.")
            raise HTTPException(status_code=500, detail=error_message)

        mp3_url = upload_result.get("url")

        # response str과 mp3_url을 데이터베이스에 넣는 과정
        message_id = create_message(user=current_user_id, content=response_text, voice_url=mp3_url, speaker="dodam",
                                    db=db)
#************************************************* 라마 서버 안켜져있을땐 여기 주석처리 start **********************
        # 1. 감정 분류 처리
        emotion_result = classify_emotion(message.message, message_id, db)

        # 2. 감정 분류 결과가 Sad, Angry, Hurt일 경우에만 카카오톡 전송
        if emotion_result in ["Sad", "Angry", "Hurt"]:
            # 감정 분류 결과와 원본 메시지, GPT 응답을 카카오톡으로 전송
            combined_message = f"피보호자의 말: {message.message}\n\n도담이의 말: {response_text}\n\n감정: {emotion_result}"
            kakao_response = await send_kakao_message(combined_message, db)
#************************************************* end **********************

        # mp3 URL을 JSON 형식으로 반환
        return {"mp3_url": mp3_url}

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/chat/me/test")
async def chat_api_test(message: Chat, current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        # 사용자별 대화 내역 가져오기, 없으면 deque 생성
        if current_user_id not in user_conversations:
            user_conversations[current_user_id] = deque(maxlen=10)

        # chat 함수 호출 시 current_user_id와 db, 그리고 대화 내역을 전달합니다.
        response_text, updated_messages = chat(message.message, current_user_id, db, user_conversations[current_user_id], pinecone_index)

        # 대화 내역 업데이트
        user_conversations[current_user_id] = updated_messages

        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
@router.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        result = await transcribe_audio(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/chat/dodam/test")
async def create_audio_file(
        message: Chat,
        db: Session = Depends(get_db),
        current_user_id: int = Depends(get_current_user)
):
    try:
        speech_stream = text_to_speech(gpt_message=message, user=current_user_id, db=db)
        if not speech_stream:
            raise HTTPException(status_code=500, detail="Failed to generate speech")

        unique_filename = f"{uuid.uuid4()}.mp3"
        upload_result = upload_file_to_s3(speech_stream, unique_filename)
        return upload_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/message", response_model=str)
async def add_message(
        content: str = Form(...),
        voice: UploadFile = File(...),
        db: Session = Depends(get_db),
        current_user_id: int = Depends(get_current_user)
):
    with tempfile.SpooledTemporaryFile() as temp_file:
        voice_content = await voice.read()
        temp_file.write(voice_content)
        temp_file.seek(0)
        voice_stream = io.BytesIO(temp_file.read())

    unique_filename = f"{uuid.uuid4()}.mp3"
    upload_result = upload_file_to_s3(voice_stream, unique_filename)

    if upload_result.get("message") == "File uploaded successfully":
        voice_url = upload_result.get('url')
    else:
        error_message = upload_result.get("message", "An unexpected error occurred during file upload.")
        raise HTTPException(status_code=500, detail=error_message)

    try:
        return create_message(user=current_user_id, content=content, voice_url=voice_url, speaker="user", db=db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 대화 보기
@router.get("/conversation/{date}", tags=["Conversation"])
async def get_conversation(
        date: str,
        db: Session = Depends(get_db),
        current_user_id: int = Depends(get_current_user)
):
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", date):
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    return get_messages(db=db, user=current_user_id, date=date)

# 대화 요약 테스트 라우터
@router.post("/conversation/summary", tags=["Test"])
def create_conversaton_summary(
        date: str = Query(..., regex=r"^\d{4}-\d{2}-\d{2}$"),
        db: Session = Depends(get_db),
        current_user_id: int = Depends(get_current_user)
):
    return create_summary(db=db, user=current_user_id, date=date)

# 대화 요약 보기
@router.get("/conversation/summary/{date}", tags=["Conversation"])
def conversaton_summary(
        date: str,
        db: Session = Depends(get_db),
        current_user_id: int = Depends(get_current_user)
):
    # 날짜 형식 검증 YYYY-MM-DD 형식
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", date):
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    return get_summary(db=db, user=current_user_id, date_str=date)


# 집 정보 저장 API (POST)
@router.post("/home/info", tags=["Home"])
async def add_home_info_route(home_info: HomeInfoRequest, db: Session = Depends(get_db), current_user_id: int = Depends(get_current_user)):
    try:
        # 집 정보를 벡터화하고 Pinecone 및 MySQL에 저장
        result = add_home_info(user_id=current_user_id, info=home_info.info, db=db)
        return {"message": "Home information added successfully", "vector_id": result.pinecone_vector_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/home/info", tags=["Home"])
async def get_home_info_route(db: Session = Depends(get_db), current_user_id: int = Depends(get_current_user)):
    try:
        # Pinecone 및 MySQL에서 집 정보 검색
        home_info = get_home_info(user_id=current_user_id, db=db)
        if home_info:
            return {"home_info": home_info}
        else:
            return {"message": "No home information found for the current user."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 집 정보 수정 API (PUT)
@router.put("/home/info/{vector_id}", tags=["Home"])
async def update_home_info_route(vector_id: str, home_info: HomeInfoRequest, db: Session = Depends(get_db), current_user_id: int = Depends(get_current_user)):
    try:
        # MySQL의 user_id 및 vector_id를 사용해 Pinecone에서 집 정보 수정
        updated_info = update_home_info(user_id=current_user_id, info=home_info.info, vector_id=vector_id, db=db)
        return {"message": "Home information updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 집 정보 삭제 API (DELETE)
@router.delete("/home/info/{vector_id}", tags=["Home"])
async def delete_home_info_route(vector_id: str, db: Session = Depends(get_db), current_user_id: int = Depends(get_current_user)):
    try:
        # MySQL의 user_id 및 vector_id를 사용해 Pinecone에서 집 정보 삭제
        delete_home_info(user_id=current_user_id, vector_id=vector_id, db=db)
        return {"message": "Home information deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))