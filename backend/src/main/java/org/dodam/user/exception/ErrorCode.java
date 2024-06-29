package org.dodam.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/*
발생할 수 있는 다양한 에러 타입
*/

@AllArgsConstructor
@Getter
public enum ErrorCode {
    //회원가입-이메일(아이디) 중복
    USEREMAIL_DUPLICATED(HttpStatus.CONFLICT, ""), //HttpStatus.CONFLICT: HTTP 409 상태 코드. 리소스 충돌
    //회원가입-전화번호 중복
    PHONENUMBER_DUPLICATED(HttpStatus.CONFLICT, ""), //HttpStatus.CONFLICT: HTTP 409 상태 코드. 리소스 충돌
    //로그인-이메일(아이디) 없음
    USEREMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, ""), //HttpStatus.NOT_FOUND: HTTP 404 상태 코드. 찾을 수 없음
    //로그인-비밀번호 틀림
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, ""); //HttpStatus.UNAUTHORIZED: HTTP 401 상태 코드. 인증되지 않음


    private HttpStatus httpStatus; //HTTP 상태 코드
    private String message; //에러에 대한 설명 또는 추가 정보를 제공
}
