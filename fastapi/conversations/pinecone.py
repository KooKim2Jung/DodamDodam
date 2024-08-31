import os
import time
import json
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from .gpt_model_utility import vectorize_message  # vectorize_message 함수 임포트

# Pinecone에 데이터를 업로드하는 함수
def upload_data_to_pinecone(index, filename, dimension):
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for item in data:
        request_text = item['request']['text']
        vector = vectorize_message(request_text)  # 벡터화 모델 교체 후 사용
        vector_id = item['id']
        metadata = {
            "original_text": request_text,
            "response": item['response']['text']
        }
        index.upsert(vectors=[{"id": vector_id, "values": vector.tolist(), "metadata": metadata}])

def init_pinecone(filename=None, dimension=768):  # 벡터 차원도 KoSimCSE 모델에 맞게 수정
    load_dotenv()
    api_key = os.getenv("PINECONE_API_KEY")

    pc = Pinecone(
        api_key=api_key
    )

    index_name = "dodam-chat"
    cloud = "aws"
    region = "us-east-1"

    # ServerlessSpec 설정
    spec = ServerlessSpec(
        cloud=cloud,
        region=region
    )

    # 인덱스 생성 또는 가져오기
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=dimension,
            metric='cosine',
            spec=spec
        )
        time.sleep(1)  # 인덱스가 준비될 때까지 대기

    index = pc.Index(index_name)

    # 인덱스 생성 후 데이터 업로드, 파일이 있는 경우에만 호출
    if filename:
        upload_data_to_pinecone(index, filename, dimension)
        print("Data uploaded successfully.")

    return index

# 이 파일을 직접 실행하는 경우에만 동작하도록 하는 코드
if __name__ == "__main__":
    filename = 'dataset.json'
    dimension = 768  # vectorize_message 함수에서 생성되는 벡터의 차원과 일치
    index = init_pinecone(filename, dimension)
