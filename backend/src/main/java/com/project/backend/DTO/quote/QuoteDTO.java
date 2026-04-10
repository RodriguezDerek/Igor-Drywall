package com.project.backend.DTO.quote;

import com.project.backend.enums.PropertyType;
import com.project.backend.enums.ServiceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuoteDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String propertyAddress;
    private ServiceType serviceType;
    private PropertyType propertyType;
    private String projectDescription;
    private String budgetRange;
    private LocalDate startDate;
    private LocalDateTime createdAt;
}
