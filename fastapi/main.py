from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from fastapi import FastAPI
from dotenv import load_dotenv
from conversations.pinecone import init_pinecone
import openai
import os
from sqlalchemy.orm import Session
from schedules.scheduler import start_scheduler, shutdown_scheduler, schedule_jobs
from mysql_connection import get_db

from conversations.routes import router as conversations_router
from s3_connection import router as s3_router
from conversations.routes import router as transcribe_router
from jwt_utils import router as jwt_router
from users.routes import router as users_router
from talk.routes import router as talk_router
from members.routes import router as member_router
from schedules.routes import router as schedules_router
from conversations.stt_connection import stt_authenticate
from emotions.routes import router as emotions_router
from sse_manager import router as sse_manager_router

import logging
import sys
import time

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logger = logging.getLogger("uvicorn")
logger.info("FastAPI 서버 시작 중...")

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:3000",
    "http://15.164.184.14",
    "http://dodam.site",
    "https://dodam.site"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 허용할 도메인 목록 업데이트
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

#app.mount("/static", StaticFiles(directory="static"), name="static")
stt_authenticate()

app.include_router(conversations_router)
app.include_router(s3_router)
app.include_router(transcribe_router)
app.include_router(jwt_router)
app.include_router(users_router)
app.include_router(talk_router)
app.include_router(member_router)
app.include_router(schedules_router)
app.include_router(emotions_router)
app.include_router(sse_manager_router)

# 서버 시작 시 APScheduler 스케줄러 실행
@app.on_event("startup")
async def startup_event():
    logger.info("FastAPI가 성공적으로 시작되었습니다.")
    try:
        db: Session = next(get_db())  # 데이터베이스 세션 생성
        logger.info("데이터베이스 연결 성공")
        schedule_jobs(db)  # 스케줄 등록 함수 호출
        start_scheduler()  # 스케줄러 시작
    except Exception as e:
        logger.error(f"schedule_jobs 실행 중 오류 발생: {e}")

# 서버 종료 시 스케줄러 종료
@app.on_event("shutdown")
async def shutdown_event():
    shutdown_scheduler()