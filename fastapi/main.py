from starlette.staticfiles import StaticFiles

from fastapi import FastAPI
from dotenv import load_dotenv
from conversations.pinecone import init_pinecone
import openai
import os

from test.sql_routes import router as sql_router
from conversations.routes import router as conversations_router
from s3_connection import router as s3_router
from conversations.routes import router as transcribe_router
from jwt_utils import router as jwt_router
from users.routes import router as users_router
from conversations.stt_connection import stt_authenticate


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

init_pinecone()

app.mount("/static", StaticFiles(directory="static"), name="static")
stt_authenticate()

app.include_router(conversations_router)
app.include_router(s3_router)
app.include_router(transcribe_router)
app.include_router(jwt_router)
app.include_router(sql_router)
app.include_router(users_router)
