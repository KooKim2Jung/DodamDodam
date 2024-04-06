package org.dodam.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

//CustomException-자바에서 정의된 exception 말고 RuntimeException 상속받아서 만든 exception
@AllArgsConstructor
@Getter
public class AppException extends RuntimeException{
    private ErrorCode errorCode; //에러를 분류할 때 사용하는 ErrorCode 열거형 인스턴스
    private String message; //예외에 대한 추가적인 메시지 정보
}
