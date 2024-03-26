package org.dodam.gpt.models;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ChatGptProdService {
    private final WebClient webClient;
    private final String apiKey;

    public ChatGptProdService(WebClient.Builder webClientBuilder) {
        Dotenv dotenv = Dotenv.load();
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
        this.apiKey = dotenv.get("OPENAI_API_KEY");
    }

    public Mono<ChatGptResponse> getGptResponse(ChatGptRequest request) {

        System.out.println(apiKey);
        return webClient.post()
                .uri("/chat/completions")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatGptResponse.class);
    }
}
