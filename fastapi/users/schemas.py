from pydantic import BaseModel
from fastapi import UploadFile
from typing import Optional

class ProfileUpdate(BaseModel):
    name: str
    gender: str
    photo: Optional[UploadFile] = None #파일이 없으면 기본값 None
    remark: str

class ProfileRead(BaseModel):
    name: str
    gender: str
    photo: str
    remark: str