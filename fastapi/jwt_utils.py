from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import APIRouter
from dotenv import load_dotenv
from datetime import datetime, timedelta
import jwt
import base64
import os
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError, PyJWTError

router = APIRouter(prefix="/api/v1")

load_dotenv()

SECRET_KEY = os.getenv("JWT_TOKEN_SECRET")
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

http_bearer_scheme = HTTPBearer()

def create_token(user_id: int):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {
        "exp": expire,
        "id": str(user_id)  # user_id 필드를 추가
    }
    # 토큰 생성
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def get_current_user(http_auth_credentials: HTTPAuthorizationCredentials = Depends(http_bearer_scheme)):
    try:
        token = http_auth_credentials.credentials  # http_auth_credentials 객체에서 credentials 속성을 통해 토큰을 추출
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("id")
        if user_id is None:
            raise Exception("유저 ID가 토큰에 없습니다.")
        return user_id
    except jwt.ExpiredSignatureError:
        print("토큰의 유효 기간이 만료되었습니다.")
    except PyJWTError as e:
        print("JWT 디코딩 오류:", str(e))
        raise Exception("인증 실패: JWT 디코딩 오류")
    except jwt.InvalidTokenError:
        print("유효하지 않은 토큰입니다.")
    except Exception as e:
        print("디코딩 중 오류가 발생했습니다:", str(e))
        raise Exception("인증 실패")


#Swagger 확인용 코드
@router.get("/users/me", tags=["Test"])
async def read_users_me(current_user_id: str = Depends(get_current_user)):
    return {"user_id": current_user_id}