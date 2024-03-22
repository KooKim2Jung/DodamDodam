package org.dodam.gpt.controllers;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.dodam.gpt.models.ChatGptRequest;
import org.dodam.gpt.models.ChatGptResponse;
import org.dodam.gpt.models.ChatGptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/chat")
public class ChatGptController {

    @Autowired
    private ChatGptService chatGptService;

    @PostMapping("/gpt")
    public Mono<ResponseEntity<ChatGptResponse>> getResponse(@RequestBody ChatGptRequest request) {
        return chatGptService.getGptResponse(request)
                .map(response -> ResponseEntity.ok(response));
    }
}
