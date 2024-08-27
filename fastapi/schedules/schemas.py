from pydantic import BaseModel
from typing import List
from datetime import datetime

class ScheduleCreate(BaseModel):
    date: datetime
    repeat: List[str]  # 반복 요일 ["월", "화", "금"]
    content: str

class ScheduleRead(BaseModel):
    id: int
    date: datetime
    repeat: List[str]
    content: str