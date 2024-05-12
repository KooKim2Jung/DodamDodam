import os
from pinecone import Pinecone, ServerlessSpec

def init_pinecone():
    # Pinecone API 키를 환경변수에서 가져옵니다.
    api_key = os.getenv("PINECONE_API_KEY")
    # Pinecone 객체를 초기화합니다.
    pc = Pinecone(api_key=api_key)

    print(api_key)
    # 'dodam-chat' 인덱스를 생성합니다.
    pc.create_index(
        name="dodam-chat",
        dimension=8,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )

    # 생성한 인덱스에 접근합니다.
    index = pc.Index(index_name="dodam-chat")

    # 벡터 데이터를 인덱스에 추가합니다.
    vectors = [
        {"id": "배가 아파", "values": [0.6, 0.3, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1], "metadata": {"response": "병원을 가는 게 어때?"}}
    ]

    # 벡터를 인덱스에 업서트합니다.
    index.upsert(vectors=vectors)
    return index

# 선택적: 함수를 사용하여 인덱스의 상태를 조회합니다.
def describe_index(index):
    return index.describe_index_stats()
