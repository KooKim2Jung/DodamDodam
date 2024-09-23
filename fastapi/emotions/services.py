from dotenv import load_dotenv
import os
from langserve import RemoteRunnable
from langchain_core.messages import HumanMessage
from sqlalchemy.orm import Session
from datetime import date
from emotions.models import Emotion
from conversations.models import Conversation, Message

# .env 파일에서 환경 변수를 로드
load_dotenv()

# 모델을 호출하는 서비스 함수
def classify_emotion(user_message: str, message_id: int, db: Session) -> str:
    # 프롬프트를 설정하여 원하는 내용으로 감정 분류 요청
    prompt = (
        "You are a helpful AI Assistant. "
        "You will receive the user's uttered sentence in Korean. "
        f"Sentence: '{user_message}'. "
        "In that sentence, classify the emotion as Happy, Sad, Angry, Anxious, Hurt, or Embarrassed. "
        "Tell me only the classified results. "
        "If it is not classified as one of the six emotions, return the result as Not Classified. "
        "Print only the results without any additional words."
    )

    # 환경 변수에서 URL을 가져옴
    api_url = "https://briefly-hip-eft.ngrok-free.app/chat/"
    chain = RemoteRunnable(api_url)

    # 프롬프트를 HumanMessage에 전달
    messages = [
        HumanMessage(content=prompt)
    ]

    result = ""
    for token in chain.stream({"messages": messages}):
        result += token.strip()

    # 잘못된 감정 결과 수정
    if result == "Haappy":
        result = "Happy"

    # 현재 날짜 가져오기
    current_date = date.today()

    # Emotion 객체 생성 및 데이터베이스에 저장
    emotion = Emotion(
        message_id=message_id,
        type=result,
        date=current_date
    )
    db.add(emotion)
    db.commit()

    return result



def get_emotions_by_date(user_id: int, query_date: date, db: Session):
    try:
        # 현재 사용자와 주어진 날짜에 해당하는 Emotion 데이터 조회
        emotions = db.query(Emotion).join(Message).join(Conversation).filter(
            Conversation.user == user_id,
            Emotion.date == query_date
        ).all()

        if not emotions:
            return {
                "happy": 0,
                "angry": 0,
                "sad": 0,
                "anxious": 0,
                "hurt": 0,
                "embrassed": 0
            }

        # 감정 유형별 개수를 세기 위한 초기값 설정
        emotion_counts = {
            "Happy": 0,
            "Angry": 0,
            "Sad": 0,
            "Anxious": 0,
            "Hurt": 0,
            "Embarrassed": 0
        }

        # 각 emotion의 type에 따라 개수 세기
        for emotion in emotions:
            if emotion.type in emotion_counts:
                emotion_counts[emotion.type] += 1

        return emotion_counts

    except Exception as e:
        raise Exception(f"An error occurred while retrieving emotions: {str(e)}")