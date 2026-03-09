package com.project.backend.model;

import com.project.backend.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    @NotBlank(message = "First name is required")
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @NotBlank(message = "Last name is required")
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    @Email(message = "Email must be valid")
    @NotBlank(message = "Email is required and must be unique")
    private String email;

    @Column(name = "phone_number", nullable = false, unique = true)
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "Password is required")
    private String password;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "date_added", updatable = false)
    private LocalDateTime dateAdded;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "account_non_expired")
    private boolean isAccountNonExpired = true;

    @Column(name = "account_non_locked")
    private boolean isAccountNonLocked = true;

    @Column(name = "credentials_non_expired")
    private boolean isCredentialsNonExpired = true;

    @Column(name = "enabled")
    private boolean isEnabled = true;

    @PrePersist
    public void prePersist(){
        createdAt = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
