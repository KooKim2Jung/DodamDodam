package org.dodam.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice(basePackages = "org.dodam.user") //@Controller, @RestController에서 발생하는 예외를 AOP를 적용해 user 패키지 내의 예외를 처리
public class ExceptionManager {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<Map<String, String>> appExceptionHandler(AppException ex){
        Map<String, String> response = new HashMap<>();
        response.put("errorCode", ex.getErrorCode().name());
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
