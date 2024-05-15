from starlette import status
from fastapi import APIRouter, HTTPException, File, UploadFile, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
from .schemas import MessageCreate
from .services import create_message
from .services import chat
from .services import transcribe_audio
from .tts_connection import text_to_speech

router = APIRouter(prefix="/api/v1")

class Chat(BaseModel):
    message: str

@router.post("/chat/me")
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


@router.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        # 서비스 레이어를 호출하여 오디오 파일 전송 및 응답 처리
        result = await transcribe_audio(file)
        return result
    except Exception as e:
        # 오류 발생시 처리
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/chat/dodam")
async def create_audio_file(text: str = Form(...)):
    filename = 'speech.mp3'  # 저장할 파일명
    try:
        result_filename = text_to_speech(text, filename)
        return FileResponse(path=result_filename, filename=filename, media_type='audio/mpeg')
    except HTTPException as e:
        raise e