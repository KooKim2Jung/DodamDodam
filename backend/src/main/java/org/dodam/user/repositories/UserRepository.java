package org.dodam.user.repositories;

import org.dodam.user.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

//DB 접근 작업 처리
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);
}
