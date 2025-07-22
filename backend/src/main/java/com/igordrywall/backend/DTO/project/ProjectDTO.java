package com.igordrywall.backend.DTO.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {
    private Integer id;
    private String name;
    private String clientName;
    private String clientPhoneNumber;
    private String contractorName;
    private String contractorPhoneNumber;
    private LocalDate startDate;
    private String projectStatus;
    private String team;
    private String address;
    private String description;
    private Integer totalDrywall;
}
