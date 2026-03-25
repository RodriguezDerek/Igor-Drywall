package com.project.backend.invoice;

import com.project.backend.DTO.invoice.InvoiceRequestDTO;
import com.project.backend.DTO.invoice.InvoiceDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.enums.InvoiceStatus;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping("/invoice")
    public ResponseEntity<GenericResponseDTO> createInvoice(@Valid @RequestBody InvoiceRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(invoiceService.createInvoice(request));
    }

    @GetMapping
    public ResponseEntity<List<InvoiceDTO>> getAllInvoices() {
        return ResponseEntity.status(HttpStatus.OK).body(invoiceService.getAllInvoices());
    }

    @GetMapping("/search")
    public ResponseEntity<List<InvoiceDTO>> getInvoicesByStatus(@RequestParam InvoiceStatus status) {
        return ResponseEntity.status(HttpStatus.OK).body(invoiceService.getInvoicesByStatus(status));
    }

    @PutMapping("/invoice/{id}")
    public ResponseEntity<GenericResponseDTO> updateInvoice(@Valid @RequestBody InvoiceRequestDTO request, @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(invoiceService.updateInvoice(request, id));
    }

    @DeleteMapping("/invoice/{id}")
    public ResponseEntity<GenericResponseDTO> deleteInvoice(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(invoiceService.deleteInvoice(id));
    }
}
