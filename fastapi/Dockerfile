# Python 이미지를 사용
FROM python:3.10-slim

# 작업 디렉터리 설정
WORKDIR /app

# 환경 변수 설정
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Poetry 설치
RUN pip install poetry

# Poetry 설정
ENV POETRY_VERSION=1.2.0
ENV POETRY_HOME="/opt/poetry"
ENV POETRY_VIRTUALENVS_IN_PROJECT=true
ENV PATH="$POETRY_HOME/bin:$PATH"
RUN curl -sSL https://install.python-poetry.org | python3 -

# 프로젝트 파일 복사
COPY pyproject.toml poetry.lock* /app/

# 의존성 설치
RUN poetry install --no-root

# 나머지 프로젝트 파일 복사
COPY . /app

# 프로젝트 실행
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
