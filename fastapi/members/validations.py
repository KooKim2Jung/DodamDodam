import re
from fastapi import HTTPException

def validate_user_data(user_data):
    try:
        validate_email(user_data.email)
        validate_password(user_data.password)
        validate_phone_number(user_data.phone_number)
    except HTTPException as e:
        raise e

def validate_email(email: str):
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if not re.match(email_regex, email):
        raise HTTPException(status_code=422, detail="유효한 이메일 형식이어야 합니다.")

def validate_password(password: str):
    if not (8 <= len(password) <= 16):
        raise HTTPException(status_code=422, detail="비밀번호는 8자 이상 16자 이하여야 합니다.")
    if not re.search(r'[A-Za-z]', password):
        raise HTTPException(status_code=422, detail="비밀번호에는 최소 한 개의 영문자가 포함되어야 합니다.")
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        raise HTTPException(status_code=422, detail="비밀번호에는 최소 한 개의 특수문자가 포함되어야 합니다.")

def validate_phone_number(phone_number: str):
    if not re.fullmatch(r'\d{11}', phone_number):
        raise HTTPException(status_code=422, detail="전화번호는 숫자 11자리여야 합니다.")
