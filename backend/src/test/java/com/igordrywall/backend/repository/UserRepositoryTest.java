package com.igordrywall.backend.repository;

import com.igordrywall.backend.model.User;
import com.igordrywall.backend.role.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldSaveAndFindUserByEmail() {
        // Given
        User user = User.builder()
                .firstName("Derek")
                .lastName("Rodriguez")
                .email("derek@gmail.com")
                .password("derek123")
                .role(Role.WORKER)
                .isEnabled(true)
                .build();

        // When
        userRepository.save(user);
        Optional<User> found = userRepository.findByEmail("derek@gmail.com");

        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getFirstName()).isEqualTo("Derek");
    }

    @Test
    void shouldFindAllEnabledUsers() {
        // Given
        User enabledUser = User.builder()
                .firstName("Jane")
                .lastName("Doe")
                .email("jane@example.com")
                .password("pass123")
                .role(Role.WORKER)
                .isEnabled(true)
                .build();

        User disabledUser = User.builder()
                .firstName("John")
                .lastName("Smith")
                .email("john@example.com")
                .password("pass456")
                .role(Role.WORKER)
                .isEnabled(false)
                .build();

        userRepository.saveAll(List.of(enabledUser, disabledUser));

        // When
        List<User> enabledUsers = userRepository.findAllByIsEnabledTrue();

        // Then
        assertThat(enabledUsers).hasSize(1);
        assertThat(enabledUsers.get(0).getEmail()).isEqualTo("jane@example.com");
    }

    @Test
    void shouldFindAllUnEnabledUsers() {
        // Given
        User enabledUser = User.builder()
                .firstName("Alice")
                .lastName("Bright")
                .email("alice@example.com")
                .password("pass789")
                .role(Role.ADMIN)
                .isEnabled(true)
                .build();

        User disabledUser = User.builder()
                .firstName("Bob")
                .lastName("Dark")
                .email("bob@example.com")
                .password("pass321")
                .role(Role.WORKER)
                .isEnabled(false)
                .build();

        userRepository.saveAll(List.of(enabledUser, disabledUser));

        // When
        List<User> disabledUsers = userRepository.findAllByIsEnabledFalse();

        // Then
        assertThat(disabledUsers).hasSize(1);
        assertThat(disabledUsers.get(0).getEmail()).isEqualTo("bob@example.com");
    }

    @Test
    void shouldCountUsersByRole() {
        // Given
        User user1 = User.builder()
                .firstName("D1")
                .lastName("L1")
                .email("one@example.com")
                .password("one")
                .role(Role.WORKER)
                .isEnabled(true)
                .build();

        User user2 = User.builder()
                .firstName("D2")
                .lastName("L2")
                .email("two@example.com")
                .password("two")
                .role(Role.WORKER)
                .isEnabled(false)
                .build();

        User user3 = User.builder()
                .firstName("D3")
                .lastName("L3")
                .email("three@example.com")
                .password("three")
                .role(Role.WORKER)
                .isEnabled(true)
                .build();

        userRepository.saveAll(List.of(user1, user2, user3));

        // When
        int workerCount = userRepository.totalUsersByRole(Role.WORKER);

        // Then
        assertThat(workerCount).isEqualTo(3);
    }
}
