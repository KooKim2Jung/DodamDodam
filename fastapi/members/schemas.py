from pydantic import BaseModel

class UserJoinRequest(BaseModel):
    email: str
    password: str
    phone_number: str

    class Config:
        from_attributes = True

class UserLoginRequest(BaseModel):
    email: str
    password: str

    class Config:
        from_attributes = True

class UserPasswordCheckRequest(BaseModel):
    password: str

    class Config:
        from_attributes = True
