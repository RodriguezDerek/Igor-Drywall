package com.project.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.backend.enums.InvoiceStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
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
@Entity
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "invoice_number", nullable = false)
    @NotBlank(message = "Invoice number is required")
    private String invoiceNumber;

    @Column(name = "title", nullable = false)
    @NotBlank(message = "Title is required")
    private String title;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    @Column(name = "issue_date", nullable = false)
    @NotNull(message = "Issue date is required")
    private LocalDateTime issueDate;

    @Column(name = "due_date", nullable = false)
    @NotNull(message = "Due date is required")
    private LocalDateTime dueDate;

    @Column(name = "client_name", nullable = false)
    @NotBlank(message = "Client name is required")
    private String clientName;

    @Column(name = "billing_address", nullable = false)
    @NotBlank(message = "Billing address is required")
    private String billingAddress;

    @Column(name = "notes", nullable = false)
    @NotBlank(message = "Notes are required")
    private String notes;

    @Column(name = "payment_instructions", nullable = false)
    @NotBlank(message = "Payment instructions are required")
    private String paymentInstructions;

    @Column(name = "amount", nullable = false)
    @DecimalMin(value = "0.0", message = "Value cannot be negative")
    @NotNull(message = "Amount is required")
    private BigDecimal amount;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<InvoiceItem> items;

    @PrePersist
    public void prePersist(){
        createdAt = LocalDateTime.now();
    }}
