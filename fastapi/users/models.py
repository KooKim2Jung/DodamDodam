from sqlalchemy import Column, Integer, String, ForeignKey
from mysql_connection import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True)
    user = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    photo = Column(String)
    remark = Column(String)