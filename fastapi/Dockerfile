# 이미지의 베이스로 공식 Python 이미지 사용
FROM python:3.11-slim

# 시스템 의존성 설치
RUN apt-get update \
    && apt-get install -y libmagic1 \
    && rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /app

RUN pip install poetry

# 의존성 파일 복사 후 설치
COPY pyproject.toml poetry.lock ./

RUN poetry install --no-root

# 나머지 애플리케이션 파일 복사
COPY . /app

# 호스트 80 포트를 컨테이너 8000 포트에 연결하고 uvicorn 서버 실행
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

