from starlette.staticfiles import StaticFiles

from fastapi import FastAPI
from dotenv import load_dotenv
import openai
import os

from test.sql_routes import router as sql_router
from conversations.routes import router as conversations_router
from s3_connection import router as s3_router
from conversations.routes import router as transcribe_router
from jwt_utils import router as jwt_router


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(conversations_router)
app.include_router(s3_router)
app.include_router(transcribe_router)
app.include_router(jwt_router)
app.include_router(sql_router)
