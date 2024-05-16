import os
import requests
from dotenv import load_dotenv

# 전역 변수로 토큰 저장
global jwt_token
jwt_token = None

def stt_authenticate():
    load_dotenv()

    client_id = os.getenv("RTZR_STT_CLIENT_ID")
    client_secret = os.getenv("RTZR_STT_CLIENT_SECRET")

    resp = requests.post(
        'https://openapi.vito.ai/v1/authenticate',
        data={'client_id': client_id, 'client_secret': client_secret}
    )
    resp.raise_for_status()
    response_json = resp.json()
    print(response_json)

    # 토큰을 전역 변수에 저장
    global jwt_token
    jwt_token = response_json['access_token']

def get_jwt_token():
    return jwt_token