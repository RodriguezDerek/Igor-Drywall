package com.project.backend.invoice;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "invoice_items")
public class InvoiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description", nullable = false)
    @NotBlank(message = "Description is required")
    private String description;

    @Column(name = "quantity", nullable = false)
    @Min(value = 0, message = "Quantity can't be negative")
    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @Column(name = "unit_price", nullable = false)
    @DecimalMin(value = "0.0", message = "Unit price can't be negative")
    @NotNull(message = "Unit price is required")
    private BigDecimal unitPrice;

    @Column(name = "tax", nullable = false)
    @DecimalMin(value = "0.0", message = "Tax cannot be negative")
    @NotNull(message = "Tax is required")
    private BigDecimal tax;

    @Column(name = "total", nullable = false)
    @DecimalMin(value = "0.0", message = "Total cannot be negative")
    @NotNull(message = "Total is required")
    private BigDecimal total;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    @JsonBackReference
    private Invoice invoice;

    @PrePersist
    public void prePersist(){
        createdAt = LocalDateTime.now();
    }
}
