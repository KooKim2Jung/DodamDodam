package org.dodam.user.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserJoinRequest {

    @Email(message = "{email.invalid}")
    private String email;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$", message = "{password.pattern}")
    private String password;

    @Pattern(regexp = "^\\d{11}$", message = "{phoneNumber.pattern}")
    private String phoneNumber;
}
