package org.dodam.user.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder //빌더 패턴을 자동으로 생성
@AllArgsConstructor //모든 필드를 파라미터로 갖는 생성자를 생성
@NoArgsConstructor //파라미터가 없는 기본 생성자를 생성
@Data //@ToString, @EqualsAndHashCode, @Getter, @Setter, @RequiredArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private Profile profile;
    private Setting setting;

    public static class Profile {
        private String name;
        private String gender;
        private String photo;
        private String remark;
    }

    public static class Setting {
        private String voice;
        private String speech;
    }
}