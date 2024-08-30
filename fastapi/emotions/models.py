from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from mysql_connection import Base

class Emotion(Base):
    __tablename__ = "emotions"

    id = Column(Integer, primary_key=True)
    message_id = Column(Integer, ForeignKey('messages.id'), nullable=False)
    type = Column(String, nullable=False)
    date = Column(Date, nullable=False)

    # Message와의 관계 설정
    message = relationship("Message", back_populates="emotions")
