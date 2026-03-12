package com.project.backend.controller;

import com.project.backend.DTO.GenericResponse;
import com.project.backend.DTO.LoginRequest;
import com.project.backend.DTO.RegisterRequest;
import com.project.backend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<GenericResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(request));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<GenericResponse> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.login(request, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<GenericResponse> logout(HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.logout(response));
    }
}
