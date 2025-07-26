package com.igordrywall.backend.DTO.project;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateProjectRequestDTO {
    @NotEmpty(message = "Project name is required")
    private String name;

    @NotEmpty(message = "Job address is required")
    private String address;

    @NotNull(message = "Date is required")
    private LocalDate startDate;

    @NotEmpty(message = "Status is required")
    private String projectStatus;

    @NotEmpty(message = "Team is required")
    private String team;

    private String clientName;

    private String clientPhoneNumber;

    private String contractorName;

    private String contractorPhoneNumber;

    private String description;
}
