package com.project.backend.DTO.project;

import com.project.backend.enums.ProjectPriority;
import com.project.backend.enums.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectTableDTO {
    private Long id;
    private String title;
    private String address;
    private ProjectStatus projectStatus;
    private ProjectPriority priority;
    private String startDate;
    private String clientName;
}
