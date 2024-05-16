
from .gpt_model_utility import chat, vectorize_message
from pinecone import Index
import json

import httpx
import openai
import asyncio
from fastapi import HTTPException
from .models import Message
from .schemas import MessageCreate
from .stt_connection import get_jwt_token

def get_similar_response(message: str) -> str or None:
    message_vector = vectorize_message(message)
    index = Index(index_name="dodam-chat")
    results = index.query([message_vector], top_k=1)
    if results['matches'] and results['matches'][0]['score'] > 0.8:
        return results['matches'][0]['metadata']['response']
    return None

def store_response(message: str, response: str):
    message_vector = vectorize_message(message)
    index = Index(index_name="dodam-chat")
    index.upsert([("response", message_vector,
                   {"response": response})])

def create_message(message_data: MessageCreate) -> str:
    # Message란 이름의 collection에 message_data를 집어넣겠다
    # .dict()을 통해 데이터를 JSON 형태로 직렬화
    message = Message.collection.insert_one(message_data.dict())
    # 확인을 위해 일단 들어간 객체의 아이디를 반환하게 해둠
    return str(message.inserted_id)

async def transcribe_audio(file):
    url = "https://openapi.vito.ai/v1/transcribe"
    token = get_jwt_token()
    if not token:
        raise HTTPException(status_code=500, detail="JWT Token is not available")

    headers = {"Authorization": f"Bearer {token}"}
    config = {}

    file_content = await file.read()
    files = {
        'file': (file.filename, file_content, file.content_type)
    }

    async with httpx.AsyncClient() as client:
        post_response = await client.post(url, headers=headers, data={'config': json.dumps(config)}, files=files)
        post_response.raise_for_status()
        transcribe_id = post_response.json().get('id')

        if not transcribe_id:
            raise HTTPException(status_code=500, detail="Failed to obtain transcribe ID")

        # Polling loop
        while True:
            get_response = await client.get(
                f'https://openapi.vito.ai/v1/transcribe/{transcribe_id}',
                headers=headers
            )
            get_response.raise_for_status()
            result = get_response.json()

            if result['status'] == 'completed' or result['status'] == 'failed':
                return result  # 종료 조건: 최종 상태에 도달
            else:
                await asyncio.sleep(5)  # 5초 동안 대기 후 다시 확인

        return result



