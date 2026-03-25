package com.project.backend.DTO.invoice;

import com.project.backend.enums.InvoiceStatus;
import com.project.backend.invoice.InvoiceItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO {
    private Long id;
    private String title;
    private InvoiceStatus status;
    private LocalDateTime issueDate;
    private LocalDateTime dueDate;
    private String clientName;
    private String billingAddress;
    private String notes;
    private String paymentInstructions;
    private Double amount;
    private LocalDateTime createdAt;
    private List<InvoiceItem> items;
}
