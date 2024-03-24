package org.dodam.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {
    @Bean
    public Dotenv dotenv() {
        return Dotenv.load();
    }

    @Bean
    public WebClient webClient(Dotenv dotenv) {
        String baseUrl = dotenv.get("API_BASE_URL", "https://api.openai.com/v1");
        return WebClient.builder().baseUrl(baseUrl).build();
    }
}
