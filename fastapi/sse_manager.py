from fastapi import FastAPI, Depends, Response, Request, APIRouter
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import Dict
import asyncio
from jwt_utils import get_current_user
import json
import logging
import sys

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logger = logging.getLogger("uvicorn")

# 사용자별 SSE 클라이언트를 관리하기 위한 딕셔너리
active_connections = {}

router = APIRouter(prefix="/api/v1", tags=["SSE"])

@router.get("/sse")
async def sse_endpoint(request: Request, current_user: int = Depends(get_current_user)):
    current_user = int(current_user)
    # 사용자가 이미 연결되어 있을 경우 기존 연결을 끊고 다시 연결
    if current_user in active_connections:
        del active_connections[current_user]

    queue = asyncio.Queue()
    active_connections[current_user] = queue

    async def event_generator():
        # 연결되었을 때 초기 메시지 전송
        await queue.put("SSE 연결이 성공적으로 이루어졌습니다.")

        try:
            while True:
                if await request.is_disconnected():
                    logger.info(f"User {current_user} has been disconnected")
                    break
                try:
                    # 큐에서 데이터가 들어오면 전송 (timeout 없이 대기)
                    data = await queue.get()
                    yield f"data: {data}\n\n"
                except Exception as e:
                    logger.error(f"Error in event_generator: {str(e)}")
        finally:
            logger.info(f"User {current_user} has disconnected from SSE")
            del active_connections[current_user]  # SSE 연결 종료 시 제거

    return StreamingResponse(event_generator(), media_type="text/event-stream")

# SSE를 통해 특정 사용자에게 메시지를 전송하는 함수
async def send_sse_message(user_id: int, message: str):
    retry_count = 3  # 재시도 횟수
    delay_between_retries = 1  # 재시도 사이의 딜레이 (초)

    for attempt in range(retry_count):
        if user_id in active_connections:
            try:
                json_message = json.dumps({
                    "mp3_url": message
                })

                await active_connections[user_id].put(json_message)
                return
            except Exception as e:
                logger.error(f"Error putting message into queue for user {user_id}: {str(e)}")
        else:
            logger.warning(f"User {user_id} is not connected to SSE, attempt {attempt + 1}/{retry_count}")
            await asyncio.sleep(delay_between_retries)  # 잠시 기다렸다가 재시도

    # 재시도 후에도 연결되지 않았을 경우
    logger.error(f"Failed to send message to user {user_id} after {retry_count} attempts")

