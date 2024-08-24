from sqlalchemy import Column, Integer, String
from mysql_connection import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    phone_number = Column(String, unique=True, nullable=False)

    # HomeInfo와의 관계 설정
    home_infos = relationship("HomeInfo", back_populates="user")