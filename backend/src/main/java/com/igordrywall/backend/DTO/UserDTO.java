package com.igordrywall.backend.DTO;

import com.igordrywall.backend.role.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


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

    @NotEmpty(message = "Date is required")
    private String dateAdded;
}
