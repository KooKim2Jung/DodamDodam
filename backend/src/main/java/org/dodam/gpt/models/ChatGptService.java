package org.dodam.gpt.models;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class ChatGptService {
    private final WebClient webClient;
    private final String apiKey;

    public ChatGptService(WebClient.Builder webClientBuilder, @Value("${chatgpt.api-key}") String apiKey) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
        this.apiKey = apiKey;
    }

    public Mono<ChatGptResponse> getGptResponse(ChatGptRequest request) {
        return webClient.post()
                .uri("/chat/completions")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatGptResponse.class)
                .doOnNext(response -> log.info("Received response: {}", response))
                .doOnError(error -> log.error("Error occurred: ", error));
    }
}
