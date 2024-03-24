package org.dodam.gpt.models;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatGptRequest {
    private String model;
    private String prompt;
}
