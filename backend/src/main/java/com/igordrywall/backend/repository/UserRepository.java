package com.igordrywall.backend.repository;

import com.igordrywall.backend.model.User;
import com.igordrywall.backend.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String number);
    List<User> findAllByIsEnabledTrue();
    List<User> findAllByIsEnabledFalse();

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    int totalUsersByRole(@Param("role") Role role);
}