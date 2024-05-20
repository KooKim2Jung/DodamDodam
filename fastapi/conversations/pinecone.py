import os
import time
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec

def init_pinecone():
    load_dotenv()
    api_key = os.getenv("PINECONE_API_KEY")

    pc = Pinecone(api_key=api_key)
    cloud = 'aws'
    region = 'us-east-1'
    spec = ServerlessSpec(cloud=cloud, region=region)

    index_name = "dodam-chat"
    existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]

    if index_name not in existing_indexes:
        pc.create_index(index_name, dimension=1536, metric='cosine', spec=spec)
        while not pc.describe_index(index_name).status['ready']:
            time.sleep(1)  # 인덱스가 준비될 때까지 대기

    index = pc.Index(index_name)
    time.sleep(1)  # 인덱스 접속 지연을 고려하여 대기
    return index