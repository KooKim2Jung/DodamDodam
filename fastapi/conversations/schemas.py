from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# 메시지 생성 요청 스키마
class MessageCreate(BaseModel):
    time: datetime
    speaker: str
    content: str
    mp3: Optional[str] = None

# 채팅 요청 스키마
class Chat(BaseModel):
    message: str

# 집 정보 요청 스키마
class HomeInfoRequest(BaseModel):
    info: str
