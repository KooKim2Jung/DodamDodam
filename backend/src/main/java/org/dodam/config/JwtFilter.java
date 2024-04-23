package org.dodam.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dodam.user.models.UserLoginService;
import org.dodam.user.utils.JwtTokenUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor //final 필드나 @NonNull 필드에 대한 생성자를 자동으로 생성
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private final UserLoginService userLoginService;
    private final String key;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // HTTP 요청에서 Authorization 헤더의 값 추출
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("authorization : {}", authorization);

        //Token 없으면 return
        if(authorization == null){
            log.error("authorization이 없습니다.");
            filterChain.doFilter(request, response);
            return;
        }

        //Token 꺼내기
        String token = authorization.split(" ")[1];

        //Token Expired 되었는지 확인
        if(JwtTokenUtil.isExpired(token, key)){
            log.error("Token이 만료 되었습니다.");
            filterChain.doFilter(request, response);
            return;
        }

        //Token에서 id 꺼내기
        String id = JwtTokenUtil.getId(token, key);
        log.info("id :{}", id);

        //권한부여
        //인증 정보를 Spring Security의 SecurityContext에 저장
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(id, null, List.of(new SimpleGrantedAuthority("USER")));

        //Detail을 넣어줌
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // 인증 세부 사항을 인증 토큰에 설정
        SecurityContextHolder.getContext().setAuthentication(authenticationToken); //스프링 시큐리티가 해당 사용자가 인증되었음을 인식하게 함
        filterChain.doFilter(request, response);
    }
}
