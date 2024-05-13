import json

import openai
import requests
from fastapi import HTTPException

from .models import Message
from .schemas import MessageCreate
from .stt_connection import get_jwt_token

def chat(message: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a friendly and casual assistant."},
            {"role": "user", "content": message},
        ],
        max_tokens=500,
        temperature=0.9,
    )
    return response.choices[0].message["content"]

def create_message(message_data: MessageCreate) -> str:
    # Message란 이름의 collection에 message_data를 집어넣겠다
    # .dict()을 통해 데이터를 JSON 형태로 직렬화
    message = Message.collection.insert_one(message_data.dict())
    # 확인을 위해 일단 들어간 객체의 아이디를 반환하게 해둠
    return str(message.inserted_id)

async def transcribe_audio(file):
    url = "https://openapi.vito.ai/v1/transcribe"
    token = get_jwt_token()  # 토큰 가져오기
    if not token:
        raise HTTPException(status_code=500, detail="JWT Token is not available")

    headers = {"Authorization": f"Bearer {token}"}

    config = {}

    # 파일을 읽고 멀티파트 인코딩 포맷에 맞게 준비
    file_content = await file.read()
    files = {
        'file': (file.filename, file_content, file.content_type)
    }

    # 요청 보내기
    response = requests.post(url, headers=headers, data={'config': json.dumps(config)}, files=files)
    response.raise_for_status()
    return response.json()
