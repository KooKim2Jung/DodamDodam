package org.dodam.gpt.models;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ChatGptService {
    private final WebClient webClient;

    public ChatGptService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
    }

    public Mono<ChatGptResponse> getGptResponse(ChatGptRequest request) {
        return webClient.post()
                .uri("/engines/gpt-3.5-turbo/completions")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer YOUR_API_KEY")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatGptResponse.class);
    }
}
