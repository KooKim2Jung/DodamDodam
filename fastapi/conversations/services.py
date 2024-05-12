from .gpt_model_utility import chat, vectorize_message
from pinecone import Index
from .models import Message
from .schemas import MessageCreate

def get_similar_response(message: str) -> str or None:
    message_vector = vectorize_message(message)
    index = Index(index_name="dodam-chat")
    results = index.query([message_vector], top_k=1)
    if results['matches'] and results['matches'][0]['score'] > 0.8:
        return results['matches'][0]['metadata']['response']
    return None

def store_response(message: str, response: str):
    message_vector = vectorize_message(message)
    index = Index(index_name="dodam-chat")
    index.upsert([("response", message_vector,
                   {"response": response})])

def create_message(message_data: MessageCreate) -> str:
    # Message란 이름의 collection에 message_data를 집어넣겠다
    # .dict()을 통해 데이터를 JSON 형태로 직렬화
    message = Message.collection.insert_one(message_data.dict())
    # 확인을 위해 일단 들어간 객체의 아이디를 반환하게 해둠
    return str(message.inserted_id)
