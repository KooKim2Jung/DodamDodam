from pydantic import BaseModel
from fastapi import UploadFile
from typing import Optional, Union

class ProfileRead(BaseModel):
    last_name: str
    name: str
    gender: str
    age: str
    photo: str
    remark: str

    class Config: #Pydantic 모델이 SQLAlchemy 객체 등의 ORM 모델로부터 데이터를 읽을 수 있게함
        from_attributes = True #Pydantic v2 이상
        #orm_mode = True #Pydantic v1 이하

class Setting(BaseModel):
    voice: str

    class Config:
        from_attributes = True

class ProfileCheckResponse(BaseModel):
    check: bool

    class Config:
        from_attributes = True