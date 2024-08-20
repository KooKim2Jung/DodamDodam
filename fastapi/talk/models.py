from mysql_connection import Base
from sqlalchemy import Column, Integer, String, DateTime

class Token(Base):
    __tablename__ = "tokens"

    id = Column(Integer, primary_key=True, default=1)
    access_token = Column(String(255), nullable=False)
    refresh_token = Column(String(255), nullable=False)
    access_token_expires_at = Column(DateTime, nullable=False)
    refresh_token_expires_at = Column(DateTime, nullable=False)
