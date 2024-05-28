import os
import time
import json
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from .gpt_model_utility import vectorize_message  # vectorize_message 함수 임포트

def upload_data_to_pinecone(index, filename, dimension):
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for item in data:
        request_text = item['request']['text']
        vector = vectorize_message(request_text)  # vectorize_text 대신 vectorize_message 사용
        vector_id = item['id']
        metadata = {
            "original_text": request_text,
            "response": item['response']['text']
        }
        index.upsert([(vector_id, vector, metadata)])

def init_pinecone(filename, dimension):
    load_dotenv()
    api_key = os.getenv("PINECONE_API_KEY")

    pc = Pinecone(api_key=api_key)
    cloud = 'aws'
    region = 'us-east-1'
    spec = ServerlessSpec(cloud=cloud, region=region)

    index_name = "dodam-chat"
    existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]

    if index_name not in existing_indexes:
        pc.create_index(index_name, dimension=dimension, metric='cosine', spec=spec)
        while not pc.describe_index(index_name).status['ready']:
            time.sleep(1)  # 인덱스가 준비될 때까지 대기

        index = pc.Index(index_name)
        time.sleep(1)  # 인덱스 접속 지연을 고려하여 대기

        # 인덱스 생성 후 데이터 업로드
        upload_data_to_pinecone(index, filename, dimension)
        print("Data uploaded successfully.")
    else:
        index = pc.Index(index_name)
        time.sleep(1)  # 인덱스 접속 지연을 고려하여 대기

    return index

# 이 파일을 직접 실행하는 경우에만 동작하도록 하는 코드
if __name__ == "__main__":
    filename = 'dataset.json'
    dimension = 1536
    index = init_pinecone(filename, dimension)
