# tasks.py
from celery_app import celery_app
from mysql_connection import get_db, SessionLocal  # db 모듈에서 세션 및 세션 함수 가져오기
from emotions.services import classify_emotion
from talk.services import send_kakao_message
from mysql_connection import SessionLocal, Base, engine
from members.models import User
from conversations.models import HomeInfo, Conversation, Message  # 모든 모델 임포트
import asyncio



# 메타데이터 바인딩 확인
Base.metadata.create_all(bind=engine)

@celery_app.task
def classify_and_notify_emotion(message: str, message_id: int, response_text: str):
    db_session = SessionLocal()
    try:
        # 데이터베이스 작업 수행
        emotion_result = classify_emotion(message, message_id, db_session)
        if emotion_result in ["Sad", "Angry", "Hurt"]:
            combined_message = f"피보호자의 말: {message}\n\n도담이의 말: {response_text}\n\n감정: {emotion_result}"
            asyncio.run(send_kakao_message(combined_message, db_session))
        return emotion_result
    finally:
        db_session.close()


