from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .services import chat

router = APIRouter(prefix="/api/v1")

class Message(BaseModel):
    message: str

@router.post("/chat")
async def chat_api(message: Message):
    try:
        response = chat(message.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
