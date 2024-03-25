package org.dodam.user.controllers;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.dodam.user.models.UserJoinRequest;
import org.dodam.user.models.UserJoinService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // @Controller에 @ResponseBody가 추가된 것, Json 형태로 객체 데이터를 반환
@RequiredArgsConstructor //final이 붙거나 @NotNull 이 붙은 필드의 생성자를 자동 생성
@RequestMapping("/api/v1/auth/join")
public class UserJoinController {

    private final UserJoinService userJoinService;

    @Operation(summary = "회원가입")
    @PostMapping
    public ResponseEntity<String> join(@RequestBody UserJoinRequest userJoinRequest){
        userJoinService.join(userJoinRequest);
        return ResponseEntity.ok().body("회원가입이 성공했습니다.");

    }
}
