package org.dodam.user.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder //빌더 패턴을 자동으로 생성
@AllArgsConstructor //모든 필드를 파라미터로 갖는 생성자를 생성
@NoArgsConstructor //파라미터가 없는 기본 생성자를 생성
@Data //@ToString, @EqualsAndHashCode, @Getter, @Setter, @RequiredArgsConstructor
@Table(name="User") //엔티티와 매핑할 테이블 지정
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //값을 따로 설정하지 않아도 1부터 1씩 자동으로 증가하며 저장
    private Long id; //회원 번호
    @Column(nullable = false, unique = true)
    private String email; //아이디(이메일)
    @Column(nullable = false)
    private String password; //비밀번호
    @Column(nullable = false, unique = true)
    private String phoneNumber; // 전화번호
}