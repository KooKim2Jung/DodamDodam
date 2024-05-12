from starlette import status
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .schemas import *
from .services import *

router = APIRouter(prefix="/api/v1")

@router.post("/chat")
async def chat_api(request: ChatRequest):
    try:
        similar_reaponse = get_similar_response(request.message)
        if similar_reaponse:
            return {"response": similar_reaponse}

        response = chat(request.message)
        store_response(request.message, response)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/messages", response_model=str, status_code=status.HTTP_201_CREATED)
def add_message(message: MessageCreate):
    message_id = create_message(message)
    if not message_id:
        raise HTTPException(status_code=400, detail="Failed to create the message")
    return message_id