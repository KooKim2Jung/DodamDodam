from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.responses import RedirectResponse
import httpx
import os
import json
from urllib.parse import urlencode

router = APIRouter(prefix="/api/v1/talk")

access_token = os.getenv("ACCESS_TOKEN")
refresh_token = os.getenv("REFRESH_TOKEN")
kakao_api_key = os.getenv("KAKAO_API_KEY")
redirect_uri = os.getenv("REDIRECT_URI")
authorize_code = "RRHTWsqA81wkfe-GvYErL3q7Z1GNA3txZkt4gp9E4Fm8AYZkJuJ39wAAAAQKPXWaAAABkGm1FXhDz1szkZmFRA"


@router.get("/authorize")
async def authorize():
    url = (
        f"https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={kakao_api_key}&redirect_uri={redirect_uri}&scope=talk_message,friends"
    )
    return RedirectResponse(url)

@router.get("/token")
async def get_token():
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

        return response.json()

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
        "receiver_uuids": json.dumps(["uom-iriLvYq5laSTo5elkKKWuou7grqCtYTj", "uo6_irqDu4y_k6GVppKll6GRqYW0hL2FvYq7yg"]),#순서: 진우, 대윤
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
