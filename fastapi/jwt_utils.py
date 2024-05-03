from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import APIRouter
from dotenv import load_dotenv
import jwt
import os
import logging
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError, PyJWTError

router = APIRouter(prefix="/api/v1")

load_dotenv()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

SECRET_KEY = os.getenv("JWT_TOKEN_SECRET")
ALGORITHM ="HS256"

http_bearer_scheme = HTTPBearer()

print("JWT_TOKEN_SECRET:", SECRET_KEY)


#http_auth_credentials: HTTPAuthorizationCredentials = Depends(http_bearer_scheme)
#token: str = Depends(http_bearer_scheme)
def get_current_user(http_auth_credentials: HTTPAuthorizationCredentials = Depends(http_bearer_scheme)):
    token = http_auth_credentials.credentials  #http_auth_credentials 객체에서 credentials 속성을 통해 토큰을 추출
    credentials_exception = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        print("토큰:", token)
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




#Swagger 확인 코드
@router.get("/users/me")
async def read_users_me(current_user_id: str = Depends(get_current_user)):
    return {"user_id": current_user_id}


@router.get("/items/")
async def read_items(http_authorization_credentials=Depends(http_bearer_scheme)):
    return {"token": http_authorization_credentials.credentials}
