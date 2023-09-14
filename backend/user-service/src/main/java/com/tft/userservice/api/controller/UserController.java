package com.tft.userservice.api.controller;

import com.tft.userservice.api.dto.request.JoinReq;
import com.tft.userservice.api.service.TestService;
import com.tft.userservice.api.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final TestService testService;

    @PostMapping("/join")
    public ResponseEntity<String> signup(@RequestBody JoinReq userJoinDto) {
        return ResponseEntity.ok(userService.join(userJoinDto));
    }


    @GetMapping(value = "/services")
    public List<String> services() {
        return testService.getServices();
    }

    @GetMapping("/test")
    public String getFood() {
        return "테스트 성공";
    }

}
