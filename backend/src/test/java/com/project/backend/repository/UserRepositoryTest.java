package com.project.backend.repository;

import com.project.backend.enums.UserRole;
import com.project.backend.user.User;
import com.project.backend.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void shouldSaveAndFindUserByEmail() {
        User user = User.builder()
                .firstName("Derek")
                .lastName("Rodriguez")
                .email("derek@email.com")
                .phoneNumber("333-444-5555")
                .password("test123")
                .role(UserRole.WORKER)
                .dateAdded(LocalDateTime.now())
                .build();

        userRepository.save(user);

        Optional<User> found = userRepository.findByEmail("derek@email.com");

        assertThat(found).isPresent();
        assertThat(found.get().getPhoneNumber()).isEqualTo("333-444-5555");
    }

    @Test
    public void shouldReturnEmptyWhenEmailNotFound() {
        User user = User.builder()
                .firstName("Jessica")
                .lastName("Miller")
                .email("jessica@email.com")
                .phoneNumber("222-333-4444")
                .password("test123")
                .role(UserRole.WORKER)
                .dateAdded(LocalDateTime.now())
                .build();

        userRepository.save(user);

        Optional<User> found = userRepository.findByEmail("notfound@email.com");

        assertThat(found).isEmpty();
    }

    @Test
    public void shouldSaveAndFindUserByPhoneNumber() {
        User user = User.builder()
                .firstName("Michael")
                .lastName("Anderson")
                .email("admin@email.com")
                .phoneNumber("111-222-3333")
                .password("admin123")
                .role(UserRole.ADMIN)
                .dateAdded(LocalDateTime.now())
                .build();

        userRepository.save(user);

        Optional<User> found = userRepository.findByPhoneNumber("111-222-3333");

        assertThat(found).isPresent();
        assertThat(found.get().getEmail()).isEqualTo("admin@email.com");
    }

    @Test
    public void shouldReturnEmptyWhenPhoneNumberNotFound() {
        User user = User.builder()
                .firstName("Daniel")
                .lastName("Rodriguez")
                .email("daniel@email.com")
                .phoneNumber("444-555-6666")
                .password("test123")
                .role(UserRole.WORKER)
                .dateAdded(LocalDateTime.now())
                .build();

        userRepository.save(user);

        Optional<User> found = userRepository.findByEmail("888-444-2202");

        assertThat(found).isEmpty();
    }

    @Test
    public void shouldReturnTrueWhenUserExistsByEmail() {
        User user = User.builder()
                .firstName("Emily")
                .lastName("Johnson")
                .email("emily@email.com")
                .phoneNumber("777-888-9999")
                .password("test123")
                .role(UserRole.WORKER)
                .dateAdded(LocalDateTime.now())
                .build();

        userRepository.save(user);

        boolean found = userRepository.existsByEmail("emily@email.com");

        assertThat(found).isTrue();
    }

    @Test
    public void shouldReturnFalseWhenUserDoesNotExistByEmail() {
        User user = User.builder()
                .firstName("Test")
                .lastName("User")
                .email("testuser@email.com")
                .phoneNumber("999-888-7777")
                .password("password123")
                .role(UserRole.WORKER)
                .dateAdded(LocalDateTime.now())
                .build();

        userRepository.save(user);

        boolean found = userRepository.existsByEmail("notfound@email.com");

        assertThat(found).isFalse();
    }

    @Test
    public void shouldReturnTrueWhenUserExistsByPhoneNumber() {
        User user = User.builder()
                .firstName("Kevin")
                .lastName("Lopez")
                .email("kevin@email.com")
                .phoneNumber("555-666-7777")
                .password("test123")
                .role(UserRole.WORKER)
                .dateAdded(LocalDateTime.now())
                .build();

        userRepository.save(user);

        boolean found = userRepository.existsByPhoneNumber("555-666-7777");

        assertThat(found).isTrue();
    }

    @Test
    public void shouldReturnFalseWhenUserDoesNotExistByPhoneNumber() {
        User user = User.builder()
                .firstName("Test")
                .lastName("User")
                .email("testuser@email.com")
                .phoneNumber("999-888-7777")
                .password("password123")
                .role(UserRole.WORKER)
                .dateAdded(LocalDateTime.now())
                .build();

        userRepository.save(user);

        boolean found = userRepository.existsByPhoneNumber("111-1020-0304");

        assertThat(found).isFalse();
    }
}
