# Python 이미지를 사용
FROM python:3.10-slim

# pip 최신 버전으로 업그레이드 및 필수 패키지 설치
RUN apt-get update && apt-get install -y \
    curl \
    libmagic1  # libmagic 라이브러리 설치

# pip 업그레이드
RUN pip install --upgrade pip

# 작업 디렉터리 설정
WORKDIR /app

# 환경 변수 설정
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV POETRY_VERSION=1.1.13
ENV POETRY_HOME="/opt/poetry"
ENV PATH="$POETRY_HOME/bin:$PATH"

# Poetry 설치
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=$POETRY_HOME POETRY_VERSION=$POETRY_VERSION python3 -

# 프로젝트 의존성 파일 복사
COPY pyproject.toml poetry.lock* /app/

# 의존성 설치, 개발 의존성은 제외하고 메인 의존성만 설치
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

# 나머지 프로젝트 파일 복사
COPY . /app

# 프로젝트 실행
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]