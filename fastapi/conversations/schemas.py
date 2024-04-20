from pydantic import BaseModel, Field, ValidationError, field_validator
from datetime import datetime
from typing import Optional


class MessageCreate(BaseModel):
    time: datetime
    speaker: str
    content: str
    mp3: Optional[str] = None

