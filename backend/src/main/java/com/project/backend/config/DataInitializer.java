package com.project.backend.config;

import com.project.backend.enums.UserRole;
import com.project.backend.user.User;
import com.project.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${admin.phoneNumber}")
    private String adminPhoneNumber;

    @Bean
    CommandLineRunner createAdminAccount() {
        return args -> {
            if(userRepository.findByEmail(adminEmail).isEmpty()){
                User admin = User.builder()
                        .firstName("Igor")
                        .lastName("Rodriguez")
                        .email(adminEmail)
                        .phoneNumber(adminPhoneNumber)
                        .password(passwordEncoder.encode(adminPassword))
                        .dateAdded(LocalDateTime.now())
                        .role(UserRole.ADMIN)
                        .dateAdded(LocalDateTime.now())
                        .createdAt(LocalDateTime.now())
                        .isAccountNonExpired(true)
                        .isAccountNonLocked(true)
                        .isCredentialsNonExpired(true)
                        .isEnabled(true)
                        .build();

                userRepository.save(admin);
                System.out.println("Admin account created");
            }
        };
    }
}
