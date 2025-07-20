package com.igordrywall.backend.repository;

import com.igordrywall.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    List<User> findAllByIsEnabledTrue();
    List<User> findAllByIsEnabledFalse();
}