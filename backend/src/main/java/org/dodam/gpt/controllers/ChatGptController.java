package org.dodam.gpt.controllers;

import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.dodam.gpt.models.ChatGptRequest;
import org.dodam.gpt.models.ChatGptResponse;
import org.dodam.gpt.models.ChatGptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@Tag(name = "Chat GPT API", description = "Swagger 테스트용 API")
@RestController
@RequestMapping("/api/chat")
public class ChatGptController {

    @Autowired
    private ChatGptService chatGptService;

    @PostMapping("/gpt")
    public Mono<ResponseEntity<ChatGptResponse>> getResponse(@RequestBody ChatGptRequest request) {
        // 클라이언트로부터 받은 요청에 모델이 설정되어 있지 않은 경우, 기본값으로 설정
        if (request.getModel() == null || request.getModel().isEmpty()) {
            request.setModel("gpt-3.5-turbo"); // 여기서 모델을 설정합니다
        }

        return chatGptService.getGptResponse(request)
                .map(response -> ResponseEntity.ok(response));
    }
}
