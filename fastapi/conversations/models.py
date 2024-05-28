from mysql_connection import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Date
from sqlalchemy.orm import relationship
from pydantic import BaseModel

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True)
    user = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    summary = Column(String, nullable=True)

    messages = relationship("Message", back_populates="conversation")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    conversation_id = Column(Integer, ForeignKey('conversations.id'), nullable=False)
    time = Column(DateTime, nullable=False)
    speaker = Column(String, nullable=False) #user, dodam
    content = Column(String, nullable=False)
    voice = Column(String, nullable=True)

    conversation = relationship("Conversation", back_populates="messages")


class Chat(BaseModel):
    message: str