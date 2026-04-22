package com.project.backend.auth;

import com.project.backend.DTO.requests.LoginRequestDTO;
import com.project.backend.DTO.requests.RegisterRequestDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.DTO.responses.LoginResponseDTO;
import com.project.backend.enums.UserRole;
import com.project.backend.exceptions.EmailExistsException;
import com.project.backend.exceptions.PhoneNumberExistsException;
import com.project.backend.exceptions.UserNotEnabledException;
import com.project.backend.exceptions.UserNotFoundException;
import com.project.backend.jwt.JwtService;
import com.project.backend.user.User;
import com.project.backend.user.UserRepository;
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
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public GenericResponseDTO register(RegisterRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailExistsException("This email is already associated with an existing account.");
        }

        if(userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()){
            throw new PhoneNumberExistsException("This phone number is already associated with another account.");
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
                .isEnabled(true) // True for testing and False for production
                .build();

        userRepository.save(newUser);

        return GenericResponseDTO.builder()
                .message("Account created successfully. Your account is now pending administrator approval.")
                .status(HttpStatus.CREATED.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public LoginResponseDTO login(LoginRequestDTO request, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new UserNotFoundException("Invalid email or password.");
        }

        if (!user.isEnabled()) {
            throw new UserNotEnabledException("Your account is pending administrator approval. Please try again later.");
        }

        String token = jwtService.generateToken(user);

        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);   // True: Production
        cookie.setPath("/");
        cookie.setMaxAge(30 * 60);

        response.addCookie(cookie);

        return LoginResponseDTO.builder()
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .build();
    }

    public GenericResponseDTO logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);

        return GenericResponseDTO.builder()
                .message("You have been logged out successfully.")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }
}
