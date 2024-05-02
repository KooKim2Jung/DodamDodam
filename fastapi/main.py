from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from fastapi import FastAPI
from dotenv import load_dotenv
import openai
import os
from starlette.requests import Request
from starlette.responses import Response


from conversations.routes import router as conversations_router
from s3_connection import router as s3_router


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(conversations_router)
app.include_router(s3_router)
