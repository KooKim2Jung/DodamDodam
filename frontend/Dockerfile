FROM node:20-alpine
WORKDIR /frontend
COPY package.json .
RUN yarn
COPY . ./
EXPOSE 3000