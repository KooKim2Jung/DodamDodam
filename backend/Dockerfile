FROM --platform=linux/amd64 gradle:8.6-jdk17-alpine as build

ENV APP_HOME=/apps

WORKDIR $APP_HOME

COPY build.gradle settings.gradle gradlew $APP_HOME

COPY gradle $APP_HOME/gradle

RUN chmod +x gradlew

# dos2unix 설치
RUN apk add --no-cache dos2unix

# gradlew 파일의 line endings 변환
RUN dos2unix gradlew


RUN ./gradlew build || return 0

COPY src $APP_HOME/src

RUN ./gradlew clean build -x check --parallel

FROM --platform=linux/amd64 openjdk:17

ENV APP_HOME=/apps
ARG ARTIFACT_NAME=app.jar
ARG JAR_FILE_PATH=build/libs/dodam-0.0.1-SNAPSHOT.jar

WORKDIR $APP_HOME

COPY --from=build $APP_HOME/$JAR_FILE_PATH $ARTIFACT_NAME

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]