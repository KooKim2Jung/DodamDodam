from starlette import status
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .schemas import MessageCreate
from .services import create_message
from .services import chat

router = APIRouter(prefix="/api/v1")

class Chat(BaseModel):
    message: str

@router.post("/chat")
async def chat_api(message: Chat):
    try:
        response = chat(message.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/messages", response_model=str, status_code=status.HTTP_201_CREATED)
def add_message(message: MessageCreate):
    message_id = create_message(message)
    if not message_id:
        raise HTTPException(status_code=400, detail="Failed to create the message")
    return message_id