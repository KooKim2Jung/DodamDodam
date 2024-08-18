from pydantic import BaseModel, EmailStr, constr

class UserJoinRequest(BaseModel):
    email: EmailStr  # 이메일 형식 자동 검증
    password: str
    phone_number: str

    class Config:
        from_attributes = True

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

    class Config:
        from_attributes = True

class UserPasswordCheckRequest(BaseModel):
    password: str

    class Config:
        from_attributes = True
