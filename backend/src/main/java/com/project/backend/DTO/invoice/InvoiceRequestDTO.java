package com.project.backend.DTO.invoice;

import com.project.backend.enums.InvoiceStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceRequestDTO {
    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Status is required")
    private InvoiceStatus status;

    @NotNull(message = "Issue date is required")
    private LocalDateTime issueDate;

    @NotNull(message = "Due date is required")
    private LocalDateTime dueDate;

    @NotBlank(message = "Client name is required")
    private String clientName;

    @NotBlank(message = "Billing address is required")
    private String billingAddress;

    @NotBlank(message = "Notes are required")
    private String notes;

    @NotBlank(message = "Payment instructions are required")
    private String paymentInstructions;

    @DecimalMin(value = "0.0", message = "Value cannot be negative")
    @NotNull(message = "Amount is required")
    private BigDecimal amount;

    @NotEmpty(message = "Invoice must contain at least one item")
    private List<InvoiceItemRequestDTO> items;
}
