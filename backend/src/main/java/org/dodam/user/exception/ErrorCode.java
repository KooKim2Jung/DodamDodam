package org.dodam.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/*
발생할 수 있는 다양한 에러 타입을 나타냄
*/

@AllArgsConstructor
@Getter
public enum ErrorCode {
    USERNAME_DUPLICATED(HttpStatus.CONFLICT, ""); //HttpStatus.CONFLICT: HTTP 409 상태 코드. 리소스 충돌

    private HttpStatus httpStatus; //HTTP 상태 코드
    private String message; //에러에 대한 설명 또는 추가 정보를 제공
}
