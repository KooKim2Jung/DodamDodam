import uuid

from starlette import status
from fastapi import APIRouter, HTTPException, File, UploadFile, Form
from .models import *
from .services import *
from .schemas import MessageCreate
from .services import create_message
from .services import chat
from .services import transcribe_audio
from .tts_connection import text_to_speech
from s3_connection import upload_file_to_s3

router = APIRouter(prefix="/api/v1")

@router.post("/chat/me")
async def chat_api(message: Chat):
    try:
        # message.message를 사용하여 메시지 속성에 접근합니다.
        similar_response = get_similar_response(message.message)
        if similar_response:
            return {"response": similar_response}

        # chat 함수 호출 시에도 message.message를 전달합니다.
        response = chat(message.message)
        store_response(message.message, response)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



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
async def create_audio_file(message: str = Form(...)):
    try:
        # TTS를 호출하여 오디오 스트림을 생성
        speech_stream = text_to_speech(message)
        if not speech_stream:
            raise HTTPException(status_code=500, detail="Failed to generate speech")

        # UUID를 사용하여 고유한 파일 이름을 생성
        unique_filename = f"{uuid.uuid4()}.mp3"

        # S3에 스트림을 업로드하고 결과를 반환
        upload_result = upload_file_to_s3(speech_stream, unique_filename)
        return upload_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))