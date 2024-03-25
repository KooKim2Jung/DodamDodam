package org.dodam.user.repositories;

import org.dodam.user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//DB 접근 작업 처리
//JpaRepository<대상으로 지정할 엔티티, 해당 엔티티 id의 필드 타입>
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserEmail(String userEmail);
}
