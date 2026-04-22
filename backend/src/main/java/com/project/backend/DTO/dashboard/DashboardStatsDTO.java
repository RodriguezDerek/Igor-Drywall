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
    private Long activeJobs;
    private Long totalQuotes;
    private Long unpaidInvoices;
    private Long totalWorkers;
}
