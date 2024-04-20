package org.dodam.user.models;

import lombok.AllArgsConstructor;
import lombok.Data;
@AllArgsConstructor
@Data
public class UserJoinRequest {
    private String email;
    private String password;
}
