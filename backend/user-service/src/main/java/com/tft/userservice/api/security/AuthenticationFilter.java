package com.tft.userservice.api.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tft.userservice.api.dto.request.LoginReq;
import com.tft.userservice.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    // login 리퀘스트 로 오는 요청을 판단
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
        Authentication authentication;
        try{
            // POST 요청으로 들어오는 acoount 와 password
            LoginReq credential = new ObjectMapper().readValue(request.getInputStream(), LoginReq.class);

            // UsernamePasswordAuthenticationToken은 Spring이 Authentication logic에 사용할 Token
            // loadUserByUsername 메소드에서 로그인 판별
            // account 와 password를 이용해 Authentication 타입의 토큰 생성
             authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(credential.getAccount(), credential.getPassword())
            );
        }catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return authentication;
    }

    // login 성공 이후 토큰 생성
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException{
        User user = (User) authResult.getPrincipal().;

        List<String> roles = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        String userId = user.getUsername();

        // response body에 넣어줄 access token 및 expired time 생성
        String accessToken = jwtTokenProvider.createJwtAccessToken(userId, request.getRequestURI(), roles);
        Date expiredTime = jwtTokenProvider.getExpiredTime(accessToken);
        // 쿠키에 넣어줄 refresh token 생성
        String refreshToken = jwtTokenProvider.createJwtRefreshToken();

        // redis에 새로 발행된 refresh token 값 갱신
        refreshTokenServiceImpl.updateRefreshToken(Long.valueOf(userId), jwtTokenProvider.getRefreshTokenId(refreshToken));

        // 쿠키 설정
        ResponseCookie refreshTokenCookie = cookieProvider.createRefreshTokenCookie(refreshToken);

        Cookie cookie = cookieProvider.of(refreshTokenCookie);

        response.setContentType(APPLICATION_JSON_VALUE);
        response.addCookie(cookie);

        // body 설정
        Map<String, Object> tokens = Map.of(
                "accessToken", accessToken,
                "expiredTime", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(expiredTime)
        );

        new ObjectMapper().writeValue(response.getOutputStream(), Result.createSuccessResult(tokens));


    }



}
