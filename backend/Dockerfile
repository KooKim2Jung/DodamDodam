# 빌드를 위한 스테이지
FROM gradle:8.6-jdk17 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 소유권을 gradle 사용자에게 할당
COPY --chown=gradle:gradle . /app

# Gradle을 사용하여 패키지 빌드
RUN gradle clean build -x test --no-daemon

# 최종 실행을 위한 스테이지
FROM openjdk:17-slim

# 애플리케이션 포트 설정
EXPOSE 8082

# 빌드 스테이지에서 생성된 JAR 파일을 최종 이미지로 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 스프링 부트 애플리케이션 실행
ENTRYPOINT ["java","-jar","/app.jar"]
