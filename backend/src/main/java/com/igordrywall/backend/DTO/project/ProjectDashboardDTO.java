package com.igordrywall.backend.DTO.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDashboardDTO {
    private Integer projectsThisWeek;
    private Integer projectsCompletedThisMonth;
    private Integer numberOfWorkers;
    private ProjectSummaryDTO mostRecentProject;
    private Integer totalProjectsCompleted;
    private Integer totalProjectsUnCompleted;
    private Integer projectsNextWeek;
}
