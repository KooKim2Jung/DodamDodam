from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from fastapi import FastAPI
from dotenv import load_dotenv
from conversations.pinecone import init_pinecone
import openai
import os

from conversations.routes import router as conversations_router
from s3_connection import router as s3_router
from conversations.routes import router as transcribe_router
from jwt_utils import router as jwt_router
from users.routes import router as users_router
from talk.routes import router as talk_router
from members.routes import router as member_router
from schedules.routes import router as schedules_router
from conversations.stt_connection import stt_authenticate


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 허용할 도메인 목록
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

app.mount("/static", StaticFiles(directory="static"), name="static")
stt_authenticate()

app.include_router(conversations_router)
app.include_router(s3_router)
app.include_router(transcribe_router)
app.include_router(jwt_router)
app.include_router(users_router)
app.include_router(talk_router)
app.include_router(member_router)
app.include_router(schedules_router)