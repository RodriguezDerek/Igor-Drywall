package com.project.backend.DTO.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsDTO {
    private Integer activeJobs;
    private Integer pendingQuotes;
    private Integer totalInvoices;
    private Integer totalWorkers;
}
