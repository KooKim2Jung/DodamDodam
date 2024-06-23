from sqlalchemy.orm import Session
import os
import ssl
import sys
import urllib.request
from io import BytesIO
from users.models import Setting

import certifi


def text_to_speech(user: int, gpt_message, db: Session, filename='output.mp3'):
    setting = db.query(Setting).filter(Setting.user == user).first()
    speaker = setting.clova_voice

    client_id = os.getenv("CLOVA_TTS_Client_ID")
    client_secret = os.getenv("CLOVA_TTS_Client_Secret")

    encText = urllib.parse.quote(gpt_message)
    data = f"speaker={speaker}&volume=0&speed=0&pitch=0&format=mp3&text={encText}"
    url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts"

    request = urllib.request.Request(url)
    request.add_header("X-NCP-APIGW-API-KEY-ID", client_id)
    request.add_header("X-NCP-APIGW-API-KEY", client_secret)
    # context = ssl._create_unverified_context()  # SSL 검증 무시
    context = ssl.create_default_context(cafile=certifi.where())  # certifi를 사용하여 CA 인증서 경로 설정

    try:
        # TTS API를 호출하고 스트리밍 응답을 받습니다.
        with urllib.request.urlopen(request, data=data.encode('utf-8'), context=context) as response:
            if response.status == 200:
                # 스트리밍 응답을 메모리 스트림으로 저장
                return BytesIO(response.read())
            else:
                return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None