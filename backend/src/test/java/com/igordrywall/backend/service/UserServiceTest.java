package com.igordrywall.backend.service;

import com.igordrywall.backend.DTO.common.GenericResponseDTO;
import com.igordrywall.backend.DTO.user.UpdateUserRequestDTO;
import com.igordrywall.backend.exception.UserNotFoundException;
import com.igordrywall.backend.model.User;
import com.igordrywall.backend.repository.UserRepository;
import com.igordrywall.backend.role.Role;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void testLoadUserByUsername_success() {
        User user = User.builder()
                .id(1)
                .email("test@example.com")
                .password("pass")
                .role(Role.WORKER)
                .isEnabled(true)
                .build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        assertEquals(user, userService.loadUserByUsername("test@example.com"));
    }

    @Test
    void testLoadUserByUsername_notFound() {
        when(userRepository.findByEmail("missing@example.com")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> userService.loadUserByUsername("missing@example.com"));
    }

    @Test
    void testUpdateUser_success() {
        User user = User.builder()
                .id(1)
                .firstName("Old")
                .lastName("Name")
                .email("old@example.com")
                .build();

        UpdateUserRequestDTO request = UpdateUserRequestDTO.builder()
                .firstName("New")
                .lastName("User")
                .email("new@example.com")
                .build();

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        GenericResponseDTO response = userService.updateUser(1, request);

        assertEquals("User updated successfully", response.getMessage());
        assertEquals(200, response.getStatus());
        verify(userRepository).save(user);
    }

    @Test
    void testUpdateUser_notFound() {
        UpdateUserRequestDTO request = UpdateUserRequestDTO.builder()
                .firstName("Test")
                .lastName("User")
                .email("user@example.com")
                .build();

        when(userRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class,
                () -> userService.updateUser(1, request));
    }

    @Test
    void testGetEnabledUsers() {
        User user = User.builder()
                .id(1)
                .firstName("Enabled")
                .lastName("User")
                .email("enabled@example.com")
                .role(Role.ADMIN)
                .dateAdded(LocalDate.now())
                .isEnabled(true)
                .build();

        when(userRepository.findAllByIsEnabledTrue()).thenReturn(List.of(user));

        var result = userService.getEnabledUsers();
        assertEquals(1, result.size());
        assertEquals("enabled@example.com", result.get(0).getEmail());
    }

    @Test
    void testGetPendingUsers() {
        User user = User.builder()
                .id(2)
                .firstName("Pending")
                .lastName("User")
                .email("pending@example.com")
                .role(Role.WORKER)
                .dateAdded(LocalDate.now())
                .isEnabled(false)
                .build();

        when(userRepository.findAllByIsEnabledFalse()).thenReturn(List.of(user));

        var result = userService.getPendingUsers();
        assertEquals(1, result.size());
        assertEquals("pending@example.com", result.get(0).getEmail());
    }
}
