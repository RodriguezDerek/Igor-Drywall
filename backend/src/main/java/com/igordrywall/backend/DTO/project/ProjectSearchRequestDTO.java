package com.igordrywall.backend.DTO.project;

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
public class ProjectSearchRequestDTO {
    @NotNull(message = "Client name cannot be null")
    private String clientName;

    @NotNull(message = "Project address cannot be null")
    private String projectAddress;

    @NotNull(message = "Status cannot be null")
    private String status;
}
