from sqlalchemy import Column, Integer, String
from mysql_connection import Base

#피보호자 설정
class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True)
    user = Column(Integer, nullable=False, unique=True)
    name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    age = Column(String, nullable=False)
    photo = Column(String)
    remark = Column(String) #특이사항

#도담이 설정
class Setting(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True)
    user = Column(Integer, nullable=False, unique=True)
    voice = Column(String, nullable=False) #목소리
    clova_voice = Column(String, nullable=False) #클로바 api 요청 목소리
    speech = Column(String, nullable=False) #말투