from pydantic import BaseModel
from fastapi import UploadFile
from typing import Optional, Union

#form 형식으로 변경
# class ProfileUpdate(BaseModel):
#     name: str
#     gender: str
#     age: str
#     photo: UploadFile
#     photo_url: str
#     remark: str

class ProfileRead(BaseModel):
    name: str
    gender: str
    age: str
    photo: str
    remark: str

    class Config:
        #from_attributes = True #Pydantic v2 이상
        orm_mode = True #Pydantic v1 이하