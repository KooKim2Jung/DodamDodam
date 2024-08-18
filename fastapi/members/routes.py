from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .schemas import UserJoinRequest, UserLoginRequest, UserPasswordCheckRequest
from .services import join_user, login_user, check_user_password
from mysql_connection import get_db
from jwt_utils import get_current_user
from typing import Dict

# FastAPI Router 설정
router = APIRouter(prefix="/api/v1/auth")


# 회원가입
@router.post("/join", response_model=Dict[str, str])
def join(user_data: UserJoinRequest, db: Session = Depends(get_db)):
    return join_user(user_data, db)

# 로그인
@router.post("/login", response_model=Dict[str, str])
def login(user_data: UserLoginRequest, db: Session = Depends(get_db)):
    token = login_user(user_data, db)
    return {"token": token}

# 보호자 모드 전환
@router.post("/switch", response_model=Dict[str, bool])
def switch(user_data: UserPasswordCheckRequest, current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db),):
    is_valid = check_user_password(current_user_id, user_data.password, db)
    return {"check": is_valid}
