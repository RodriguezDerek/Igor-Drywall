package com.igordrywall.backend.auth;

import com.igordrywall.backend.DTO.auth.*;
import com.igordrywall.backend.DTO.common.GenericResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<GenericResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request){
        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@Valid @RequestBody AuthenticationRequestDTO request){
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.login(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<GenericResponseDTO> logout(){
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.logout());
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<GenericResponseDTO> forgotPassword(@Valid @RequestBody EmailRequestDTO request){
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.processForgotPassword(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<GenericResponseDTO> resetPassword(@Valid @RequestBody ResetRequestDTO request){
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.processResetPassword(request));
    }
}