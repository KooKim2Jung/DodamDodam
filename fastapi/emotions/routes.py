# routes.py
from fastapi import APIRouter
from pydantic import BaseModel
from .services import classify_emotion

# FastAPI 라우터 정의
router = APIRouter(prefix="/api/v1")

class EmotionRequest(BaseModel):
    message: str

# 감정 분류 API 엔드포인트
@router.post("/classify")
async def classify_emotion_route(request: EmotionRequest):
    result = classify_emotion(request.message)
    return {"result": result}
