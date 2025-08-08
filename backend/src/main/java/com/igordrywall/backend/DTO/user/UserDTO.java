package com.igordrywall.backend.DTO.user;

import com.igordrywall.backend.role.Role;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    @NotNull(message = "Id is required")
    private Integer id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required and must be unique")
    private String email;

    @NotEmpty(message = "Role is required")
    private Role role;

    private LocalDate dateAdded;

    @NotBlank(message = "Phone number is required")
    @Size(max = 20, message = "Phone number must not be longer than 20 characters")
    @Pattern(regexp = "^\\+?[0-9\\-\\s]{7,20}$", message = "Invalid phone number format")
    private String phoneNumber;
}
