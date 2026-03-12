package com.project.backend.service;

import com.project.backend.DTO.GenericResponse;
import com.project.backend.DTO.LoginRequest;
import com.project.backend.DTO.RegisterRequest;
import com.project.backend.enums.UserRole;
import com.project.backend.exceptions.EmailExistsException;
import com.project.backend.exceptions.PhoneNumberExistsException;
import com.project.backend.exceptions.UserNotEnabledException;
import com.project.backend.exceptions.UserNotFoundException;
import com.project.backend.model.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.security.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public GenericResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailExistsException("This email is already associated with an existing account.");
        }

        if(userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()){
            throw new PhoneNumberExistsException("Phone Number already is taken");
        }

        User newUser = User.builder()
                .firstName(request.getFirstName().trim().toLowerCase())
                .lastName(request.getLastName().trim().toLowerCase())
                .email(request.getEmail().trim().toLowerCase())
                .phoneNumber(request.getPhoneNumber().trim())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.WORKER)
                .isAccountNonExpired(true)
                .isAccountNonLocked(true)
                .isCredentialsNonExpired(true)
                .isEnabled(false)
                .build();

        userRepository.save(newUser);

        return GenericResponse.builder()
                .message("Account created successfully. Awaiting administrator approval.")
                .status(HttpStatus.CREATED.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponse login(LoginRequest request, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
        );

        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        if (!user.isEnabled()) {
            throw new UserNotEnabledException("Account not activated by admin yet");
        }

        String token = jwtService.generateToken(user);

        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);   // True: Production / False: Development
        cookie.setPath("/");
        cookie.setMaxAge(30 * 60);

        response.addCookie(cookie);

        return GenericResponse.builder()
                .message("Login successful. Welcome back!")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponse logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);

        return GenericResponse.builder()
                .message("Logout successful")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }
}
