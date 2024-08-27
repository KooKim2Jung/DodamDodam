from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi import HTTPException
from .models import User
from .schemas import UserJoinRequest, UserLoginRequest
from jwt_utils import create_token

# 비밀번호 암호화를 위한 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def join_user(user_data: UserJoinRequest, db: Session):
    # 이메일 중복 체크
    existing_user_by_email = db.query(User).filter(User.email == user_data.email).first()
    if existing_user_by_email:
        raise HTTPException(status_code=400, detail="이메일이 이미 존재합니다.")

    # 전화번호 중복 체크
    existing_user_by_phone_number = db.query(User).filter(User.phone_number == user_data.phone_number).first()
    if existing_user_by_phone_number:
        raise HTTPException(status_code=400, detail="전화번호가 이미 존재합니다.")

    # 비밀번호 암호화
    hashed_password = pwd_context.hash(user_data.password)

    # 사용자 데이터 저장
    new_user = User(
        email=user_data.email,
        password=hashed_password,
        phone_number=user_data.phone_number
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "회원가입이 성공했습니다."}


def login_user(user_data: UserLoginRequest, db: Session):
    # 이메일로 사용자 찾기
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    # 비밀번호 검증
    if not pwd_context.verify(user_data.password, user.password):
        raise HTTPException(status_code=400, detail="비밀번호가 틀렸습니다.")

    return create_token(user_id=user.id)


def check_user_password(user_id: int, password: str, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return False
    return pwd_context.verify(password, user.password)
