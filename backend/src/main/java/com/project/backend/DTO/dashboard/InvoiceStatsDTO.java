package com.project.backend.DTO.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceStatsDTO {
    private Integer totalInvoices;
    private BigDecimal overdueAmount;
    private Integer pastDueCount;
    private BigDecimal totalReceived;
    private BigDecimal amountThisMonth;
    private Integer paidThisMonth;
}
