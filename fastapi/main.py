from fastapi import FastAPI
from dotenv import load_dotenv
import openai
import os

from conversations.routes import router

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()


app.include_router(router)
