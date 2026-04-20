package com.project.backend.user;

import com.project.backend.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);

    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String phoneNumber);

    List<User> findTop4ByRole(UserRole role);
    List<User> findAllByIsEnabled(Boolean status);

    long countByRole(UserRole role);
}
