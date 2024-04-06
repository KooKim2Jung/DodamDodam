package org.dodam.gpt.controllers;

import org.dodam.gpt.models.ChatGptRequest;
import org.dodam.gpt.models.ChatGptResponse;
import org.dodam.gpt.models.ChatGptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
public class ChatGptController {

    private final ChatGptService gptService;

    @Autowired
    public ChatGptController(ChatGptService gptService) {
        this.gptService = gptService;
    }

    @GetMapping(value = "/chat/default", produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<ChatGptResponse> getDefaultResponse() {
        return gptService.getDefaultGptResponseAsStream();
    }

    @PostMapping(value = "/chat", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<ChatGptResponse> getGptResponse(@RequestBody ChatGptRequest request) {
        return gptService.getGptResponse(request);
    }
}
