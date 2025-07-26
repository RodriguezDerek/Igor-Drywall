package com.igordrywall.backend.DTO.auth;

import com.igordrywall.backend.DTO.user.UserDTO;
import com.igordrywall.backend.role.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponseDTO {
    private String token;
    private Role role;
    private String message;
    private UserDTO userDTO;
}