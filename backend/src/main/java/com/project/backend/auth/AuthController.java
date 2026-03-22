package com.project.backend.auth;

import com.project.backend.DTO.requests.LoginRequestDTO;
import com.project.backend.DTO.requests.RegisterRequestDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.DTO.responses.LoginResponseDTO;
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
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<GenericResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request, HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(request, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<GenericResponseDTO> logout(HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.logout(response));
    }
}
