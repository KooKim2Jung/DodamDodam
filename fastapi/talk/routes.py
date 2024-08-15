from fastapi import FastAPI, HTTPException, APIRouter, Depends
from mysql_connection import get_db
from .services import  *
import httpx
import os
import pytz


router = APIRouter(prefix="/api/v1/talk")

kakao_api_key = os.getenv("KAKAO_API_KEY")
redirect_uri = os.getenv("REDIRECT_URI")
admin_key = os.getenv("ADMIN_KEY")

# 한국 시간대 설정
korea_timezone = pytz.timezone('Asia/Seoul')
now_korea = datetime.utcnow().replace(tzinfo=pytz.utc).astimezone(korea_timezone)

@router.get("/token")
async def get_token(authorize_code: str, db: Session = Depends(get_db)):
    token_data = await fetch_kakao_token(authorize_code, db, kakao_api_key, redirect_uri)
    return token_data

#친구 목록
@router.get("/friend")
async def get_friend(db: Session = Depends(get_db)):
    friends_list = await fetch_friends_list(db)
    return friends_list

# 카톡 보내기
@router.post("/send")
async def send_message(text: str, db: Session = Depends(get_db)):
    response = await send_kakao_message(text, db)
    return response

# refresh token으로 access token 재발급
@router.get("/refresh")
async def refresh_access_token_route(db: Session = Depends(get_db)):
    new_tokens = await refresh_access_token(db, kakao_api_key)
    return new_tokens

# #사용자 정보 가져오기
# @router.get("/profile")
# async def get_user_profile(db: Session = Depends(get_db)):
#     access_token = get_access_token(db)
#     url = "https://kapi.kakao.com/v2/user/me"
#     headers = {
#         "Authorization": f"Bearer {access_token}"
#     }
#
#     async with httpx.AsyncClient() as client:
#         response = await client.get(url, headers=headers)
#
#         if response.status_code != 200:
#             raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch profile: {response.text}")
#
#         return response.json()
#
#여러 사용자 정보 가져오기
@router.get("/users")
async def get_app_users():
    url = "https://kapi.kakao.com/v2/app/users"
    headers = {
        "Authorization": f"KakaoAK {admin_key}"
    }
    params = {
        "target_id_type": "user_id",
        "target_ids": json.dumps(["3665796096"])  # JSON 문자열로 변환
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch app users: {response.text}")

        return response.json()
