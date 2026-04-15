package com.project.backend.user;

import com.project.backend.DTO.users.UpdateUserDetailsRequestDTO;
import com.project.backend.DTO.users.UpdateUserPasswordRequestDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.DTO.users.UserDTO;
import com.project.backend.DTO.users.UserTableDTO;
import com.project.backend.enums.UserRole;
import com.project.backend.exceptions.*;
import com.project.backend.jwt.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public List<UserTableDTO> getTableWorkers() {
        return userRepository.findTop4ByRole(UserRole.WORKER).stream().map(this::toUserTableDTO).toList();
    }

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
        user.setDateAdded(LocalDate.now());
        userRepository.save(user);

        return GenericResponseDTO.builder()
                .message("User account has been activated successfully.")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponseDTO updateUserDetails(UpdateUserDetailsRequestDTO request, HttpServletResponse response, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user was found with the provided ID."));

        if (!hasUserDetailsChanged(user, request)) {
            throw new DetailsUnchangedException("No changes were detected. Please modify at least one field before updating.");
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

        String newToken = jwtService.generateToken(user);

        Cookie cookie = new Cookie("jwt", newToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);   // True: Production
        cookie.setPath("/");
        cookie.setMaxAge(30 * 60);

        response.addCookie(cookie);

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

    private UserTableDTO toUserTableDTO(User user) {
        return UserTableDTO.builder()
                .id(user.getId())
                .name(user.getFirstName() + " " + user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .dateAdded(user.getDateAdded())
                .build();
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
