FROM python:3.12-slim

# 필수 패키지 설치
RUN apt-get update && apt-get install -y \
    curl \
    libmagic1

# pip 업그레이드
RUN pip install --upgrade pip

# 작업 디렉터리 설정
WORKDIR /app

# 환경 변수 설정
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Poetry 설치 및 구성
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"

# 프로젝트 의존성 파일 복사
COPY pyproject.toml /app/

# 의존성 설치
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Python 및 Uvicorn 버전 확인
RUN python --version
RUN pip show uvicorn

# 나머지 프로젝트 파일 복사
COPY . /app
COPY static /app/static

# 프로젝트 실행
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
