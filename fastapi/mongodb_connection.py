# 몽고디비 공통 모듈
from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()

MONGO_USER = os.getenv("MONGO_INITDB_ROOT_USERNAME")
MONGO_PASS = os.getenv("MONGO_INITDB_ROOT_PASSWORD")
MONGO_DB = os.getenv("MONGO_INITDB_DATABASE")
#쿼리 파라미터 추가해서 관리자모드로 진입
MONGO_URL = os.getenv("MONGODB_URL") + "?authSource=admin"

client = MongoClient(MONGO_URL)
db = client[MONGO_DB]