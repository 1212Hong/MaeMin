package com.tft.userservice.db.entity;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 사용자 시퀀스
    private Long userId;

    // 사용자 아이디
    private String account;

    // 사용자 패스워드
    private String userPw;

    // 사용자 이름
    private String userName;

    // 사용자 상태
    private String userStatus;

    @Builder
    public User(Long userId, String account, String userPw, String userNm, String userSt) {
        this.userId = userId;
        this.account = account;
        this.userPw = userPw;
        this.userName = userNm;
        this.userStatus = userSt;
    }
}