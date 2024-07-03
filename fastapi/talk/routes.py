from fastapi import FastAPI, HTTPException, APIRouter, Depends
from fastapi.responses import RedirectResponse
from urllib.parse import urlencode
from mysql_connection import get_db
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from .models import Token
import httpx
import os
import json
import pytz


router = APIRouter(prefix="/api/v1/talk")

access_token = os.getenv("ACCESS_TOKEN")
refresh_token = os.getenv("REFRESH_TOKEN")
kakao_api_key = os.getenv("KAKAO_API_KEY")
redirect_uri = os.getenv("REDIRECT_URI")
admin_key = os.getenv("ADMIN_KEY")

# 한국 시간대 설정
korea_timezone = pytz.timezone('Asia/Seoul')
now_korea = datetime.utcnow().replace(tzinfo=pytz.utc).astimezone(korea_timezone)

#uuid 안바뀜 but 팀원이 토큰을 발급받아야 보낼 수 있음
#카톡 보내기 전에 준비 과정
#1. 리프레시 토큰으로 엑세스 토큰 새로 발급받기
#2. 팀원들이 각자 디벨로퍼스 사이트에서 토큰 발급받기 -> https://developers.kakao.com/tool/rest-api/open/get/v1-api-talk-friends

@router.get("/token")
async def get_token(authorize_code: str, db: Session = Depends(get_db)):
    url = "https://kauth.kakao.com/oauth/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "authorization_code",
        "client_id": kakao_api_key,
        "redirect_uri": redirect_uri,
        "code": authorize_code
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, data=data)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch token")

        #응답으로 받은 토큰을 데이터베이스에 저장
        token_data = response.json()
        access_token = token_data.get("access_token")
        refresh_token = token_data.get("refresh_token")

        if not access_token or not refresh_token:
            raise HTTPException(status_code=400, detail="Invalid token response")

        access_token_expires_at = now_korea + timedelta(seconds=21599)
        refresh_token_expires_at = now_korea + timedelta(seconds=5183999)

        token = db.query(Token).filter(Token.id == 1).first()

        if token:
            token.access_token = access_token
            token.refresh_token = refresh_token
            token.access_token_expires_at = access_token_expires_at
            token.refresh_token_expires_at = refresh_token_expires_at
        else:
            token = Token(
                access_token=access_token,
                refresh_token=refresh_token,
                access_token_expires_at=access_token_expires_at,
                refresh_token_expires_at=refresh_token_expires_at
            )
            db.add(token)

        db.commit()
        db.refresh(token)

        return token_data

#사용자 정보 가져오기
@router.get("/profile")
async def get_user_profile():
    url = "https://kapi.kakao.com/v2/user/me"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch profile: {response.text}")

        return response.json()

#여러 사용자 정보 가져오기
@router.get("/users")
async def get_app_users():
    url = "https://kapi.kakao.com/v2/app/users"
    headers = {
        "Authorization": f"KakaoAK {admin_key}"
    }
    params = {
        "target_id_type": "user_id",
        "target_ids": json.dumps([3601528360, 3602805925, 3606070861, 3602260771])  # JSON 문자열로 변환
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch app users: {response.text}")

        return response.json()

#친구 목록
@router.get("/friend")
async def get_friend():
    url = "https://kapi.kakao.com/v1/api/talk/friends"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch profile: {response.text}")

        return response.json()

@router.post("/send")
async def send_message():
    url = "https://kapi.kakao.com/v1/api/talk/friends/message/default/send"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Bearer {access_token}"
    }
    data = {
        "receiver_uuids": json.dumps(["uom-iriLvYq5laSTo5elkKKWuou7grqCtYTj", "uo6_irqDu4y_k6GVppKll6GRqYW0hL2FvYq7yg", "uo62j72Iu46ikaOSqp2tm6OXu4q6g7uDtIXq"]), #순서: 진우, 대윤, 가은
        #"receiver_uuids": json.dumps(["uom-iriLvYq5laSTo5elkKKWuou7grqCtYTj"]),  # 진우
        #"receiver_uuids": json.dumps(["uo6_irqDu4y_k6GVppKll6GRqYW0hL2FvYq7yg"]),  # 대윤
        # "receiver_uuids": json.dumps(["uo62j72Iu46ikaOSqp2tm6OXu4q6g7uDtIXq"]),  # 가은
        "template_object": json.dumps({
            "object_type": "text",
            "text": "테스트중입니다",
            "link": {
                "web_url": "https://developers.kakao.com",
                "mobile_web_url": "https://developers.kakao.com"
            },
            "button_title": "바로 확인"
        })
    }

    encoded_data = urlencode(data)

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, data=encoded_data)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to send message: {response.text}")

        return response.json()

@router.get("/refresh")
async def refresh_access_token():
    url = "https://kauth.kakao.com/oauth/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "refresh_token",
        "client_id": kakao_api_key,
        "refresh_token": refresh_token
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, data=data)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to refresh token")

        new_tokens = response.json()

        return new_tokens

