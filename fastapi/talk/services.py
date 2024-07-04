from sqlalchemy.orm import Session
from .models import Token
from fastapi import HTTPException

# 데이터베이스에서 access_token 가져오기
def get_access_token(db: Session):
    token = db.query(Token).filter(Token.id == 1).first()
    if not token:
        raise HTTPException(status_code=404, detail="Token not found")
    return token.access_token

# 데이터베이스에서 refresh_token 가져오기
def get_refresh_token(db: Session):
    token = db.query(Token).filter(Token.id == 1).first()
    if not token:
        raise HTTPException(status_code=404, detail="Token not found")
    return token.refresh_token

