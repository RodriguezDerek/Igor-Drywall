package com.igordrywall.backend.config;

import com.igordrywall.backend.model.User;
import com.igordrywall.backend.repository.UserRepository;
import com.igordrywall.backend.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    @Bean
    public CommandLineRunner initAdmin(){
        return args -> {
            if(userRepository.findByEmail(adminEmail).isEmpty()){
                User admin = User.builder()
                        .firstName("igor")
                        .lastName("rodriguez")
                        .email(adminEmail)
                        .password(passwordEncoder.encode(adminPassword))
                        .dateAdded(LocalDate.now())
                        .role(Role.ADMIN)
                        .isEnabled(true)
                        .build();

                userRepository.save(admin);
                System.out.println("Admin account created");
            }
        };
    }
}
