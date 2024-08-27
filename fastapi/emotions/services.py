from dotenv import load_dotenv
import os
from langserve import RemoteRunnable
from langchain_core.messages import HumanMessage

# .env 파일에서 환경 변수를 로드
load_dotenv()

# 모델을 호출하는 서비스 함수
def classify_emotion(user_message: str) -> str:
    # 환경 변수에서 URL을 가져옴
    api_url = os.environ.get("REMOTE_API_URL")
    chain = RemoteRunnable(api_url)

    messages = [
        HumanMessage(content=user_message)
    ]

    result = ""
    for token in chain.stream({"messages": messages}):
        result += token

    return result
