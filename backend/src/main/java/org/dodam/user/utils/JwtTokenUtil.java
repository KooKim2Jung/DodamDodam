package org.dodam.user.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtTokenUtil {

    //Token에서 id 꺼내기
    public static String getId(String token, String key){
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().get("id", String.class);
    }

     //지금보다 이전에 expired 되었는지 확인
    public static boolean isExpired(String token, String key){
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getExpiration().before(new Date());
    }

    //토큰 생성
    public static String createToken(String id, String key, Long expireTimeMs) { //key: 유효성 검증에 사용, expireTimeMs: 토큰이 만료되는 시간(밀리초 단위)
        Claims claims = Jwts.claims(); //claim: 토큰의 내용을 저장하는 역할
        claims.put("id", id); //사용자 아이디를 클레임에 추가

        return Jwts.builder() //jwt 빌더를 초기화
                .setClaims(claims) //생성한 클레임을 토큰에 추가
                .setIssuedAt(new Date(System.currentTimeMillis())) //토큰이 생성된 시각을 설정
                .setExpiration(new Date(System.currentTimeMillis() + expireTimeMs)) //토큰의 만료 시각을 설정
                .signWith(SignatureAlgorithm.HS256, key) //토큰에 서명. Signature: 헤더에서 선언한 알고리즘과 key를 이용해 암호한 값
                .compact() //위에서 설정된 값들을 포함하는 JWT를 문자열 형태로 압축하고 반환
                ;
    }
}
