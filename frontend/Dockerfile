# node.js 20 버전을 사용하겠다는 의미
FROM node:20-alpine

# 컨테이터 내부 현 디렉토리를 frontend로 설정
WORKDIR /frontend

# /frontend/node_modules/.bin 디렉토리를 PATH 환경 변수에 추가
ENV PATH /frontend/node_modules/.bin:$PATH

# package.json을 복사 (dependencies를 설치하기 위함)
COPY package.json yarn.lock ./

# package.json에 있는 dependencies를 설치
RUN yarn install

# /frontend에 있는 모든 파일들을 복사 (소스 코드)
COPY . ./

# 아래는 배포용
RUN yarn build

CMD ["yarn", "start"]
