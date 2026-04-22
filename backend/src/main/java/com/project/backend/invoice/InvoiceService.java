package com.project.backend.invoice;

import com.project.backend.DTO.invoice.InvoiceItemRequestDTO;
import com.project.backend.DTO.invoice.InvoiceRequestDTO;
import com.project.backend.DTO.invoice.InvoiceDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.enums.InvoiceStatus;
import com.project.backend.exceptions.DetailsUnchangedException;
import com.project.backend.exceptions.InvoiceItemNotFoundException;
import com.project.backend.exceptions.InvoiceNameExistsException;
import com.project.backend.exceptions.InvoiceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public GenericResponseDTO createInvoice(InvoiceRequestDTO request) {
        if (invoiceRepository.existsByTitle(request.getTitle())) {
            throw new InvoiceNameExistsException("Invoice Name exists");
        }

        Invoice invoice = Invoice.builder()
                .title(request.getTitle())
                .status(request.getStatus())
                .issueDate(request.getIssueDate())
                .dueDate(request.getDueDate())
                .clientName(request.getClientName())
                .billingAddress(request.getBillingAddress())
                .notes(request.getNotes())
                .paymentInstructions(request.getPaymentInstructions())
                .amount(request.getAmount())
                .build();

        List<InvoiceItem> items = new ArrayList<>();

        for (InvoiceItemRequestDTO itemRequest : request.getItems()) {
            double total = itemRequest.getUnitPrice() * itemRequest.getQuantity();

            InvoiceItem item = InvoiceItem.builder()
                    .description(itemRequest.getDescription())
                    .quantity(itemRequest.getQuantity())
                    .unitPrice(itemRequest.getUnitPrice())
                    .total(total)
                    .invoice(invoice)
                    .build();

            items.add(item);
        }

        invoice.setItems(items);
        invoiceRepository.save(invoice);

        return GenericResponseDTO.builder()
                .message("Invoice created successfully")
                .status(HttpStatus.CREATED.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public List<InvoiceDTO> getAllInvoices() {
        return invoiceRepository.findAll().stream().map(this::toInvoiceDTO).toList();
    }

    public InvoiceDTO getInvoiceById(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice with id " + id + " not found"));

        return InvoiceDTO.builder()
                .id(invoice.getId())
                .title(invoice.getTitle())
                .status(invoice.getStatus())
                .issueDate(invoice.getIssueDate())
                .dueDate(invoice.getDueDate())
                .clientName(invoice.getClientName())
                .billingAddress(invoice.getBillingAddress())
                .notes(invoice.getNotes())
                .paymentInstructions(invoice.getPaymentInstructions())
                .amount(invoice.getAmount())
                .createdAt(invoice.getCreatedAt())
                .items(invoice.getItems())
                .build();
    }

    public List<InvoiceDTO> getInvoicesByStatus(InvoiceStatus status) {
        if (status.equals(InvoiceStatus.ALL)) {
            return invoiceRepository.findAll().stream().map(this::toInvoiceDTO).toList();
        } else {
            return invoiceRepository.findByStatus(status).stream().map(this::toInvoiceDTO).toList();
        }
    }

    public GenericResponseDTO updateInvoice(InvoiceRequestDTO request, Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with id"));

        if (!hasInvoiceDetailsChanged(invoice, request) && !hasInvoiceItemsDetailChanged(invoice, request)) {
            throw new DetailsUnchangedException("No changes were detected. Please modify at least one field before updating.");
        }

        if (!invoice.getTitle().equals(request.getTitle()) && invoiceRepository.existsByTitle(request.getTitle())) {
            throw new InvoiceNameExistsException("The provided title is already used by another invoice.");
        }

        invoice.setTitle(request.getTitle());
        invoice.setStatus(request.getStatus());
        invoice.setIssueDate(request.getIssueDate());
        invoice.setDueDate(request.getDueDate());
        invoice.setClientName(request.getClientName());
        invoice.setBillingAddress(request.getBillingAddress());
        invoice.setNotes(request.getNotes());
        invoice.setPaymentInstructions(request.getPaymentInstructions());
        invoice.setAmount(request.getAmount());

        if (hasInvoiceItemsDetailChanged(invoice, request)) {

            List<InvoiceItem> existingItems = invoice.getItems();

            // 1. Remove deleted items
            existingItems.removeIf(existingItem ->
                    request.getItems().stream()
                            .noneMatch(reqItem ->
                                    reqItem.getId() != null &&
                                            reqItem.getId().equals(existingItem.getId())
                            )
            );

            // 2. Add / update items
            for (InvoiceItemRequestDTO itemRequest : request.getItems()) {

                double total = itemRequest.getUnitPrice() * itemRequest.getQuantity();

                // NEW ITEM
                if (itemRequest.getId() == null) {

                    InvoiceItem newItem = InvoiceItem.builder()
                            .description(itemRequest.getDescription())
                            .quantity(itemRequest.getQuantity())
                            .unitPrice(itemRequest.getUnitPrice())
                            .total(total)
                            .invoice(invoice)
                            .build();

                    existingItems.add(newItem);
                }

                // EXISTING ITEM
                else {

                    InvoiceItem existingItem = existingItems.stream()
                            .filter(item -> item.getId().equals(itemRequest.getId()))
                            .findFirst()
                            .orElseThrow(() ->
                                    new InvoiceItemNotFoundException("Item not found")
                            );

                    existingItem.setDescription(itemRequest.getDescription());
                    existingItem.setQuantity(itemRequest.getQuantity());
                    existingItem.setUnitPrice(itemRequest.getUnitPrice());

                    existingItem.setTotal(total);
                }
            }
        }

        invoiceRepository.save(invoice);

        return GenericResponseDTO.builder()
                .message("Invoice updated successfully")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponseDTO deleteInvoice(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with id"));

        invoiceRepository.delete(invoice);

        return GenericResponseDTO.builder()
                .message("Invoice deleted successfully")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    private InvoiceDTO toInvoiceDTO(Invoice invoice) {
        return InvoiceDTO.builder()
                .id(invoice.getId())
                .title(invoice.getTitle())
                .status(invoice.getStatus())
                .issueDate(invoice.getIssueDate())
                .dueDate(invoice.getDueDate())
                .clientName(invoice.getClientName())
                .billingAddress(invoice.getBillingAddress())
                .notes(invoice.getNotes())
                .paymentInstructions(invoice.getPaymentInstructions())
                .amount(invoice.getAmount())
                .createdAt(invoice.getCreatedAt())
                .items(invoice.getItems())
                .build();
    }

    private boolean hasInvoiceDetailsChanged(Invoice invoice, InvoiceRequestDTO request) {
        return !invoice.getTitle().equals(request.getTitle()) ||
                !invoice.getStatus().equals(request.getStatus()) ||
                !invoice.getIssueDate().equals(request.getIssueDate()) ||
                !invoice.getDueDate().equals(request.getDueDate()) ||
                !invoice.getClientName().equals(request.getClientName()) ||
                !invoice.getBillingAddress().equals(request.getBillingAddress()) ||
                !invoice.getNotes().equals(request.getNotes()) ||
                !invoice.getPaymentInstructions().equals(request.getPaymentInstructions()) ||
                !invoice.getAmount().equals(request.getAmount());
    }

    private boolean hasInvoiceItemsDetailChanged(Invoice invoice, InvoiceRequestDTO request) {
        List<InvoiceItem> existingItems = invoice.getItems();
        List<InvoiceItemRequestDTO> newItems = request.getItems();

        if (existingItems.size() != newItems.size()) {
            return true;
        }

        for (int i = 0; i < existingItems.size(); i++) {
            InvoiceItem existing = existingItems.get(i);
            InvoiceItemRequestDTO incoming = newItems.get(i);

            if (!existing.getDescription().equals(incoming.getDescription()) ||
                    !existing.getQuantity().equals(incoming.getQuantity()) ||
                    !existing.getUnitPrice().equals(incoming.getUnitPrice())) {

                return true;
            }
        }

        return false;
    }
}
