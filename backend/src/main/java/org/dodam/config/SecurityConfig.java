package org.dodam.config;

import lombok.RequiredArgsConstructor;
import org.dodam.user.models.UserLoginService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@EnableWebSecurity //Spring Security 설정을 활성화
@EnableMethodSecurity //메소드 수준의 보안을 활성화
@Configuration //이 클래스가 Spring 설정 클래스임을 나타내며, Spring 컨테이너에 의해 관리됨
@RequiredArgsConstructor //final 필드나 @NonNull 필드에 대한 생성자를 자동으로 생성
public class SecurityConfig {

    private final UserLoginService userLoginService;

    @Value("${jwt.token.secret}")
    private String key;


    //CORS(Cross-Origin Resource Sharing) 설정 구성
    //CORS - 웹 애플리케이션에서 다른 출처(도메인, 프로토콜, 포트)의 리소스에 대한 접근을 허용하는 메커니즘
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*")); // 모든 오리진(도메인) 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 모든 HTTP 메서드 허용
        configuration.setAllowedHeaders(List.of("*")); // 모든 헤더 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 경로에 CORS 설정 적용
        return source;
    }

    //HTTP 보안 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable) //csrf 보호 기능 비활성화 - rest api를 이용한 서버는 인증정보를 보관하지 않기 때문
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //세션을 사용하지 않음
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(requests -> requests // HTTP 요청에 대한 접근 제어
//                        .requestMatchers(
//                                "/",
//                                "api/v1/auth/login",
//                                "api/v1/auth/join"
//                        ).permitAll() //인증 여부와 상관없이 해당 경로에 대해 접근 허용
                            .anyRequest().permitAll() //.authenticated() //나머지 요청은 인증 필요 //일단 다 허용 해놓음
                )
                .addFilterBefore(new JwtFilter(userLoginService, key), UsernamePasswordAuthenticationFilter.class); // jwt 인증 필터

        return http.build();
    }
}