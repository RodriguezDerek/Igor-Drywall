package com.project.backend.DTO.project;

import com.project.backend.enums.ProjectPriority;
import com.project.backend.enums.ProjectStatus;
import com.project.backend.enums.ServiceType;
import com.project.backend.material.MaterialSheet;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {
    private Long id;
    private String title;
    private String address;
    private ServiceType serviceType;
    private ProjectStatus projectStatus;
    private LocalDateTime startDate;
    private LocalTime startTime;
    private ProjectPriority priority;
    private String description;
    private String notes;
    private String clientName;
    private String clientPhoneNumber;
    private String clientEmail;
    private String budgetRange;
    private LocalDateTime lastUpdated;
    private LocalDateTime createdAt;
    private List<MaterialSheet> materialList;
}
