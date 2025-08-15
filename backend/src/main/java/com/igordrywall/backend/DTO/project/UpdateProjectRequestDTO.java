package com.igordrywall.backend.DTO.project;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProjectRequestDTO {

    @NotBlank(message = "Project name is required")
    private String name;

    @NotBlank(message = "Client name is required")
    private String clientName;

    @NotBlank(message = "Client phone number is required")
    private String clientPhoneNumber;

    @NotBlank(message = "Contractor name is required")
    private String contractorName;

    @NotBlank(message = "Contractor phone number is required")
    private String contractorPhoneNumber;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotBlank(message = "Project status is required")
    private String projectStatus;

    @NotBlank(message = "Team is required")
    private String team;

    @NotBlank(message = "Project address is required")
    private String address;

    @NotBlank(message = "Project description is required")
    private String description;

}
