from sqlalchemy import Column, Integer, String, DateTime, JSON
from mysql_connection import Base

class Schedule(Base):
    __tablename__ = 'schedules'

    id = Column(Integer, primary_key=True)
    user = Column(Integer, nullable=False)
    date = Column(DateTime, nullable=False)
    repeat = Column(JSON, nullable=True)
    content = Column(String, nullable=False)