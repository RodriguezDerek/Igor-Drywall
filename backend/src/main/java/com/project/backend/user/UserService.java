package com.project.backend.user;

import com.project.backend.DTO.requests.LoginRequestDTO;
import com.project.backend.DTO.requests.RegisterRequestDTO;
import com.project.backend.DTO.requests.UpdateUserDetailsRequestDTO;
import com.project.backend.DTO.requests.UpdateUserPasswordRequestDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.DTO.responses.LoginResponseDTO;
import com.project.backend.DTO.users.UserDTO;
import com.project.backend.enums.UserRole;
import com.project.backend.exceptions.*;
import com.project.backend.jwt.JwtService;
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
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::toUserDTO).toList();
    }

    public GenericResponseDTO deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user was found with the provided ID."));

        userRepository.delete(user);

        return GenericResponseDTO.builder()
                .message("User has been removed successfully.")
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.OK.value())
                .build();
    }

    public GenericResponseDTO acceptUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user was found with the provided ID."));

        user.setEnabled(true);
        user.setDateAdded(LocalDateTime.now());
        userRepository.save(user);

        return GenericResponseDTO.builder()
                .message("User account has been activated successfully.")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponseDTO updateUserDetails(UpdateUserDetailsRequestDTO request, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user was found with the provided ID."));

        if (!hasUserDetailsChanged(user, request)) {
            throw new UserDetailsUnchangedException("No changes were detected. Please modify at least one field before updating.");
        }

        String newEmail = request.getEmail();
        String newPhoneNumber = request.getPhoneNumber();

        if (!user.getEmail().equals(newEmail) && userRepository.existsByEmail(newEmail)) {
            throw new EmailExistsException("The provided email address is already associated with another account.");
        }

        if (!user.getPhoneNumber().equals(newPhoneNumber) && userRepository.existsByPhoneNumber(newPhoneNumber)) {
            throw new PhoneNumberExistsException("The provided phone number is already associated with another account.");
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(newEmail);
        user.setPhoneNumber(newPhoneNumber);

        userRepository.save(user);

        return GenericResponseDTO.builder()
                .message("User has been updated successfully.")
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.OK.value())
                .build();
    }

    public GenericResponseDTO updateUserPassword(UpdateUserPasswordRequestDTO request, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user was found with the provided ID."));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new InvalidCurrentPasswordException("Current password is incorrect.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return GenericResponseDTO.builder()
                .message("Password has been updated successfully.")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    private boolean hasUserDetailsChanged(User user, UpdateUserDetailsRequestDTO request) {
        return !user.getFirstName().equals(request.getFirstName()) ||
                !user.getLastName().equals(request.getLastName()) ||
                !user.getEmail().equals(request.getEmail()) ||
                !user.getPhoneNumber().equals(request.getPhoneNumber());
    }

    private UserDTO toUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .dateAdded(user.getDateAdded())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
