package org.dodam.gpt.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dodam.gpt.models.ChatTestService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Chat GPT TEST입니다.", description = "Swagger 테스트용 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/chat-gpt")
public class GptTestController {

    private final ChatTestService chatTestService;

    @PostMapping("")
    public String test(@RequestBody String question){
        return chatTestService.getChatResponse(question);
    }
}
