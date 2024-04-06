package org.dodam.user.models;

import lombok.AllArgsConstructor;
import lombok.Data;
@AllArgsConstructor
@Data
public class UserJoinRequest {
    private String userEmail;
    private String userPw;
    private String phone;
}
