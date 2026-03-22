package com.project.backend.DTO.quote;

import com.project.backend.enums.PropertyType;
import com.project.backend.enums.ServiceType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateQuoteRequestDTO {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Address is required")
    private String propertyAddress;

    @NotNull(message = "Service type is required")
    private ServiceType serviceType;

    @NotNull(message = "Property type is required")
    private PropertyType propertyType;

    @NotBlank(message = "Project description is required")
    private String projectDescription;

    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;

    @NotBlank(message = "Budget range is required")
    private String budgetRange;
}
