package org.dodam.user.models;

import lombok.RequiredArgsConstructor;
import org.dodam.user.entities.User;
import org.dodam.user.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserPasswordCheckService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public boolean checkPassword(Long userId, String password) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return false;
        }
        return encoder.matches(password, user.getPassword());
    }
}