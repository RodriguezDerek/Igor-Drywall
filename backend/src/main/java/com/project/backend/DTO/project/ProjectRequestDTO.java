package com.project.backend.DTO.project;

import com.project.backend.enums.ProjectPriority;
import com.project.backend.enums.ProjectStatus;
import com.project.backend.enums.ServiceType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectRequestDTO {

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Service type is required")
    private ServiceType serviceType;

    @NotNull(message = "Project status is required")
    private ProjectStatus status;

    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @NotNull(message = "Project priority is required")
    private ProjectPriority priority;

    @NotBlank(message = "Project description is required")
    private String projectDescription;

    private String notes;

    @NotBlank(message = "Client name is required")
    private String clientName;

    @NotBlank(message = "Client phone number is required")
    private String clientPhoneNumber;

    @Email(message = "Invalid email format")
    private String clientEmail;

    private String budgetRange;
}