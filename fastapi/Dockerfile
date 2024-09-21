# 1. 기본 Python 3.11 slim 이미지 사용
FROM python:3.11-slim

# 2. 시스템 의존성 설치
RUN apt-get update \
    && apt-get install -y libmagic1 tini \
    && rm -rf /var/lib/apt/lists/*

# 3. 작업 디렉토리 설정
WORKDIR /app

# 4. Poetry 설치
RUN pip install poetry

# 5. 의존성 파일 복사 후 설치
COPY pyproject.toml poetry.lock ./

# 6. 가상환경 비활성화 및 의존성 설치
RUN poetry config virtualenvs.create false \
    && poetry install --no-root

# 7. 애플리케이션 파일 복사
COPY . /app

# 8. Entrypoint로 tini 설정
ENTRYPOINT ["tini", "--"]

# 9. FastAPI 및 Celery 서비스 시작
CMD ["sh", "-c", "celery -A celery_app worker --loglevel=info & uvicorn main:app --host 0.0.0.0 --port 8080"]
