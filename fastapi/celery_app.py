# celery_app.py
from celery import Celery
from mysql_connection import Base, engine  # 데이터베이스 연결 및 메타데이터 가져오기
from members.models import User
from conversations.models import HomeInfo, Conversation, Message  # 모든 모델 임포트

# Celery 애플리케이션 생성
celery_app = Celery(
    "celery_app",
    broker="amqp://guest@rabbitmq//",  # RabbitMQ 브로커 URL
    include=["tasks"]
)

# 결과 백엔드 비활성화
celery_app.conf.update(
    result_backend=None
)

# 메타데이터 초기화 - 모든 모델을 바인딩
Base.metadata.create_all(bind=engine)
