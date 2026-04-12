package com.project.backend.DTO.project;

import com.project.backend.enums.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectTableDTO {
    private Long id;
    private String title;
    private String address;
    private ProjectStatus projectStatus;
    private LocalDateTime startDate;
    private String clientName;
}
