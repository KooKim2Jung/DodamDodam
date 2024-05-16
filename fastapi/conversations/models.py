from mongodb_connection import db
from pydantic import BaseModel


# mongoDB의 컬렉션 주소만 설정하고 따로 필드를 정의해두진 않음
# -> 몽고디비 자체가 유연한 구조를 지향하기에 필드 제한은 스키마를 통해서만 진행
class Conversation:
    collection = db.conversations

class Message:
    collection = db.messages

class Chat(BaseModel):
    message: str