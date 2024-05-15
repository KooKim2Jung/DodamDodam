import os
import sys
import urllib.request

def text_to_speech(message, filename='output.mp3'):
    client_id = os.getenv("CLOVA_TTS_Client_ID")
    client_secret = os.getenv("CLOVA_TTS_Client_Secret")

    encText = urllib.parse.quote(message)
    data = f"speaker=nara&volume=0&speed=0&pitch=0&format=mp3&text={encText}"
    url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts"

    request = urllib.request.Request(url)
    request.add_header("X-NCP-APIGW-API-KEY-ID", client_id)
    request.add_header("X-NCP-APIGW-API-KEY", client_secret)

    try:
        response = urllib.request.urlopen(request, data=data.encode('utf-8'))
        rescode = response.getcode()
        if rescode == 200:
            print("TTS mp3 파일이 저장되었습니다.")
            response_body = response.read()
            with open(filename, 'wb') as f:
                f.write(response_body)
        else:
            print(f"Error Code: {rescode}")
    except Exception as e:
        print(f"요청 처리 중 오류가 발생했습니다: {e}")