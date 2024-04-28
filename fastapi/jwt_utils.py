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
ALGORITHM = "HS256"

http_bearer_scheme = HTTPBearer()

print("JWT_TOKEN_SECRET:", SECRET_KEY)

#http_auth_credentials: HTTPAuthorizationCredentials = Depends(http_bearer_scheme)
#token: str = Depends(http_bearer_scheme)
def get_current_user(http_auth_credentials: HTTPAuthorizationCredentials = Depends(http_bearer_scheme)):
    token = http_auth_credentials.credentials #http_auth_credentials 객체에서 credentials 속성을 통해 토큰을 추출
    credentials_exception = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        #token = http_auth_credentials.credentials
        #token_bytes = token.encode('utf-8') #토큰을 UTF-8 형식의 바이트로 인코딩
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) #토큰을 디코딩하고 비밀키 및 지정된 알고리즘을 사용하여 서명을 검증
        user_id: str = payload.get("id")
        if user_id is None:
            raise credentials_exception
        return user_id
    except PyJWTError as e:
        logging.error("JWT 디코딩 오류: %s", str(e))
        raise credentials_exception


#Swagger 확인 코드
@router.get("/users/me")
async def read_users_me(current_user_id: str = Depends(get_current_user)):
    return {"user_id": current_user_id}

@router.get("/items/")
async def read_items(http_authorization_credentials=Depends(http_bearer_scheme)):
    return {"token": http_authorization_credentials.credentials}