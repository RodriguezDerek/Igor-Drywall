package com.igordrywall.backend.auth;

import com.igordrywall.backend.DTO.auth.*;
import com.igordrywall.backend.DTO.common.GenericResponse;
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
    public ResponseEntity<GenericResponse> register(@Valid @RequestBody RegisterRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody AuthenticationRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.login(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<GenericResponse> logout(){
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.logout());
    }

    @PutMapping("/authorize/enable/{userID}")
    public ResponseEntity<GenericResponse> enable(@PathVariable Integer userID){
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.enable(userID));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<GenericResponse> forgotPassword(@Valid @RequestBody EmailRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.processForgotPassword(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<GenericResponse> resetPassword(@Valid @RequestBody ResetRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.processResetPassword(request));
    }
}