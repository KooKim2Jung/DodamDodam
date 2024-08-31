from sqlalchemy.orm import Session
from .models import Token
from fastapi import HTTPException
import httpx
from datetime import datetime, timedelta
import pytz
import json
from urllib.parse import urlencode

korea_timezone = pytz.timezone('Asia/Seoul')
now_korea = datetime.utcnow().replace(tzinfo=pytz.utc).astimezone(korea_timezone)

# 데이터베이스에서 access_token 가져오기
def get_access_token(db: Session):
    token = db.query(Token).filter(Token.id == 1).first()
    if not token:
        raise HTTPException(status_code=404, detail="Token not found")
    return token.access_token


# 데이터베이스에서 refresh_token 가져오기
def get_refresh_token(db: Session):
    token = db.query(Token).filter(Token.id == 1).first()
    if not token:
        raise HTTPException(status_code=404, detail="Token not found")
    return token.refresh_token


#token 생성
async def fetch_kakao_token(authorize_code: str, db: Session, kakao_api_key: str, redirect_uri: str):
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

        # 응답으로 받은 토큰을 데이터베이스에 저장
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


# 친구 목록
async def fetch_friends_list(db: Session):
    access_token = get_access_token(db)
    url = "https://kapi.kakao.com/v1/api/talk/friends"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch profile: {response.text}")

        return response.json()


# 카톡 보내기
async def send_kakao_message(text: str, db: Session):
    access_token = get_access_token(db)
    url = "https://kapi.kakao.com/v1/api/talk/friends/message/default/send"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Bearer {access_token}"
    }
    data = {
        "receiver_uuids": json.dumps(["Pws6Dz8GPgk6FiQQIxcgEiQULAAxADIDMwIyeQ", "Pw05CTwENwc2GisYKxwpECgaKAQ1BDYHNwY2ZQ"]),  # 대윤, 미현, 가은
        "template_object": json.dumps({
            "object_type": "text",
            "text": text,
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


# refresh token으로 access token 재발급
async def refresh_access_token(db: Session, kakao_api_key: str):
    refresh_token = get_refresh_token(db)
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

        # 데이터베이스 access_token 업데이트
        if new_tokens.get("access_token"):
            new_access_token = new_tokens.get("access_token")
            token = db.query(Token).filter(Token.id == 1).first()
            token.access_token = new_access_token
            token.access_token_expires_at = now_korea + timedelta(seconds=21599)
            db.commit()

        return new_tokens