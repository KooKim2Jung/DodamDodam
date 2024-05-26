import uuid
import io
import tempfile
from starlette import status
from fastapi import APIRouter, HTTPException, File, UploadFile, Form, Depends
from .models import *
from .services import *
from .schemas import MessageCreate
from .services import create_message
from .services import chat
from .services import transcribe_audio
from .tts_connection import text_to_speech
from s3_connection import upload_file_to_s3
from mysql_connection import get_db
from jwt_utils import get_current_user
from sqlalchemy.orm import Session
from starlette.datastructures import UploadFile as StarletteUploadFile

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

@router.post("/message", response_model=str)
async def add_message(
        content: str = Form(...),
        voice: UploadFile = File(...),
        db: Session = Depends(get_db),
        current_user_id: int = Depends(get_current_user)
):
    # voice 파일을 io.BytesIO 타입으로 변환
    with tempfile.SpooledTemporaryFile() as temp_file:
        voice_content = await voice.read()
        temp_file.write(voice_content)
        temp_file.seek(0)
        voice_stream = io.BytesIO(temp_file.read())

    unique_filename = f"{uuid.uuid4()}.mp3"
    upload_result = upload_file_to_s3(voice_stream, unique_filename)

    if upload_result.get("message") == "File uploaded successfully":
        voice_url = upload_result.get('url')
    else:
        error_message = upload_result.get("message", "An unexpected error occurred during file upload.")
        raise HTTPException(status_code=500, detail=error_message)

    try:
        return create_message(user=current_user_id, content=content, voice_url=voice_url, speaker="user", db=db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
