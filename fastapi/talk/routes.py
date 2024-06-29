from fastapi import FastAPI, HTTPException, APIRouter
import httpx
import os

router = APIRouter(prefix="/api/v1/talk")

access_token = os.getenv("ACCESS_TOKEN")
refresh_token = os.getenv("REFRESH_TOKEN")
kakao_api_key = os.getenv("KAKAO_API_KEY")
redirect_uri = "https://example.com/oauth"
authorize_code = "zDMnqe3ZORgq4xlocz3Ni80rdnklqh9McvgSMp2NeUOklK6066P_DQAAAAQKPXPrAAABkGTww0_SDh85zpcCzQ"

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

# @router.get("/friend")
# async def get_profile():
#     url = "https://kapi.kakao.com/v1/api/talk/friends"
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
