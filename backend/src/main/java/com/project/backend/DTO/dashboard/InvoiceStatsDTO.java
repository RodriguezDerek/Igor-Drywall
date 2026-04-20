package com.project.backend.DTO.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceStatsDTO {
    private long totalInvoices;
    private long unpaidInvoices;
    private double totalReceived;
    private long paidThisMonth;
}
