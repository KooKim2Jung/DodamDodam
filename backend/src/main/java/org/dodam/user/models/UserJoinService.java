package org.dodam.user.models;

import lombok.RequiredArgsConstructor;
import org.dodam.user.entities.User;
import org.dodam.user.exception.AppException;
import org.dodam.user.exception.ErrorCode;
import org.dodam.user.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserJoinService {

    private final UserRepository userRepository;

    public void join(UserJoinRequest userJoinRequest){

        //userEmail 중복 체크
        userRepository.findByUserEmail(userJoinRequest.getUserEmail())
                .ifPresent(user -> {
                    throw new AppException(ErrorCode.USERNAME_DUPLICATED, userJoinRequest.getUserEmail() + "는 이미 있습니다.");
                });

        //DB에 저장
        userRepository.save(User.builder()
                .userEmail(userJoinRequest.getUserEmail())
                .userPw(userJoinRequest.getUserPw())
                .phone(userJoinRequest.getPhone())
                .build());
    }
}
