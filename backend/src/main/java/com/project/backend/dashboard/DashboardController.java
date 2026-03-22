package com.project.backend.dashboard;

import com.project.backend.DTO.dashboard.DashboardStatsDTO;
import com.project.backend.DTO.dashboard.InvoiceStatsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/stats")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.status(HttpStatus.OK).body(dashboardService.getDashboardStats());
    }

    @GetMapping("/invoices")
    public ResponseEntity<InvoiceStatsDTO> getInvoiceStats() {
        return ResponseEntity.status(HttpStatus.OK).body(dashboardService.getInvoiceStats());
    }
}
