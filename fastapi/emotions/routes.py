# routes.py
from pydantic import BaseModel
from .services import classify_emotion
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from emotions.services import get_emotions_by_date
from jwt_utils import get_current_user
from mysql_connection import get_db
from datetime import date
# FastAPI 라우터 정의
router = APIRouter(prefix="/api/v1")

class EmotionRequest(BaseModel):
    message: str

# 감정 분류 API 엔드포인트
@router.post("/classify")
async def classify_emotion_route(request: EmotionRequest):
    result = classify_emotion(request.message)
    return {"result": result}

@router.get("/emotions/")
async def fetch_emotions_by_date(
        date: date = Query(...),
        db: Session = Depends(get_db),
        current_user_id: int = Depends(get_current_user)
):
    try:
        # 서비스 로직 호출
        emotions = get_emotions_by_date(current_user_id, date, db)

        if emotions is None:
            raise HTTPException(status_code=404, detail="No emotions found for the given date.")

        return emotions

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
