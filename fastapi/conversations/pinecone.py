import os
import time
import uuid
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec, Index

def init_pinecone():
    load_dotenv()
    api_key = os.getenv("PINECONE_API_KEY")

    pc = Pinecone(api_key=api_key)

    cloud = 'aws'
    region = 'us-east-1'
    spec = ServerlessSpec(cloud=cloud, region=region)

    index_name = "dodam-chat"

    existing_indexs = [
        index_info["name"] for index_info in pc.list_indexes()
    ]

    if index_name not in existing_indexs:
        pc.create_index(
            index_name,
            dimension=1536,
            metric='cosine',
            spec=spec
        )
        while not pc.describe_index(index_name).status['ready']:
            time.sleep(1)

    index = pc.Index(index_name)
    time.sleep(1)

    # 벡터 데이터를 생성하고 ASCII 호환 UUID를 사용합니다.
    vector_id = str(uuid.uuid4())  # ASCII 호환 UUID 생성
    vectors = [
        {"id": vector_id, "values": [0.6] * 1536, "metadata": {"original_text": "배가 아파", "response": "병원을 가는 게 어때?"}}
    ]

    index.upsert(vectors=vectors)

    index.describe_index_stats()

    return index
