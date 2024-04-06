package org.dodam.gpt.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatGptService {

    private final WebClient webClient;
    private final String apiKey;

    @Autowired
    public ChatGptService(WebClient webClient, @Value("${openai.api.key}") String apiKey) {
        this.webClient = webClient;
        this.apiKey = apiKey;
    }

    public Flux<ChatGptResponse> getDefaultGptResponseAsStream() {
        ChatGptRequest defaultRequest = new ChatGptRequest();
        defaultRequest.setModel("gpt-3.5-turbo");
        defaultRequest.setMessages("hi");

        return getGptResponse(defaultRequest);
    }

    public Flux<ChatGptResponse> getGptResponse(ChatGptRequest request) {
        Mono<ChatGptResponse> responseMono = webClient.post()
                .uri("/v1/chat/completions")
                .header("Authorization", "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(request))
                .retrieve()
                .bodyToMono(ChatGptResponse.class);  // 변환 대상인 ChatGptResponse.class로 응답을 받는다.

        return responseMono.flux(); // Mono를 Flux로 변환
    }

}
