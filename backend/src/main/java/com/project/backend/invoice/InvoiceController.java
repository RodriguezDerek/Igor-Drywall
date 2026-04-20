package com.project.backend.invoice;

import com.project.backend.DTO.invoice.InvoiceRequestDTO;
import com.project.backend.DTO.invoice.InvoiceDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.enums.InvoiceStatus;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping("/invoice")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> createInvoice(@Valid @RequestBody InvoiceRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(invoiceService.createInvoice(request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<InvoiceDTO>> getAllInvoices() {
        return ResponseEntity.status(HttpStatus.OK).body(invoiceService.getAllInvoices());
    }

    @GetMapping("/invoice/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InvoiceDTO> getInvoiceById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(invoiceService.getInvoiceById(id));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<InvoiceDTO>> getInvoicesByStatus(@RequestParam InvoiceStatus status) {
        return ResponseEntity.status(HttpStatus.OK).body(invoiceService.getInvoicesByStatus(status));
    }

    @PutMapping("/invoice/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> updateInvoice(@Valid @RequestBody InvoiceRequestDTO request, @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(invoiceService.updateInvoice(request, id));
    }

    @DeleteMapping("/invoice/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> deleteInvoice(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(invoiceService.deleteInvoice(id));
    }
}
