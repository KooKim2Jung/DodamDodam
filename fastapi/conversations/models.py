from mysql_connection import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Date
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from datetime import datetime

# 대화 모델 정의
class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True)
    user = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    summary = Column(String, nullable=True)

    messages = relationship("Message", back_populates="conversation")

# 메시지 모델 정의
class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    conversation_id = Column(Integer, ForeignKey('conversations.id'), nullable=False)
    time = Column(DateTime, nullable=False)
    speaker = Column(String, nullable=False)  # user, dodam
    content = Column(String, nullable=False)
    voice = Column(String, nullable=True)

    conversation = relationship("Conversation", back_populates="messages")

class HomeInfo(Base):
    __tablename__ = "home_info"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    pinecone_vector_id = Column(String, nullable=False)  # Pinecone 벡터 ID 저장
    info = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # User와의 관계 설정
    user = relationship("User", back_populates="home_infos")
