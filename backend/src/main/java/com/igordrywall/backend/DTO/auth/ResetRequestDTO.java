package com.igordrywall.backend.DTO.auth;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResetRequestDTO {
    @NotEmpty(message = "Token is required")
    private String token;

    @NotEmpty(message = "Password is required")
    private String newPassword;
}
