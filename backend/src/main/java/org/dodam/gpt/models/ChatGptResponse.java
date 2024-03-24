package org.dodam.gpt.models;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatGptResponse {
    private String prompt;
    private String response;
}
