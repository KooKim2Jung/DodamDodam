from fastapi import FastAPI
from dotenv import load_dotenv
import openai
import os

from conversations.routes import router as conversations_router
from s3_connection import router as s3_router


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()


app.include_router(conversations_router)
app.include_router(s3_router)
