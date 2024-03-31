package org.dodam.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = "org.dodam.user") //@Controller, @RestController에서 발생하는 예외를 AOP를 적용해 user 패키지 내의 예외를 처리
public class ExceptionManager {
    @ExceptionHandler(AppException.class)
    public ResponseEntity<?> appExceptionHandler(AppException e){
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(e.getErrorCode().name() + " " + e.getMessage());
    }
/*
    @ExceptionHandler(RuntimeException.class) //RuntimeException 유형의 예외를 처리하는 메소드
    public ResponseEntity<?> runtimeExceptionHandler(RuntimeException e){
        return ResponseEntity.status(HttpStatus.CONFLICT) //HTTP 상태 코드 409 충돌
                .body(e.getMessage());
    }
    */
}
