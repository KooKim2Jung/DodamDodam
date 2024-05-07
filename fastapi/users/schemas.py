from pydantic import BaseModel
from fastapi import UploadFile
from typing import Optional, Union

class ProfileUpdate(BaseModel):
    name: str
    gender: str
    age: int
    photo: Optional[Union[UploadFile, str]] = None  # 파일 또는 URL
    remark: str

class ProfileRead(BaseModel):
    name: str
    gender: str
    age: int
    photo: str
    remark: str