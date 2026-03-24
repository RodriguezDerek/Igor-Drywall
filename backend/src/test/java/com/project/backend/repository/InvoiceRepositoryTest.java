package com.project.backend.repository;

import com.project.backend.enums.InvoiceStatus;
import com.project.backend.invoice.Invoice;
import com.project.backend.invoice.InvoiceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
public class InvoiceRepositoryTest {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Test
    public void shouldReturnTrueWhenInvoiceDoesExistByTitle() {
        Invoice invoice = Invoice.builder()
                .title("Test Project Invoice #1")
                .status(InvoiceStatus.PAID)
                .issueDate(LocalDateTime.now())
                .dueDate(LocalDateTime.now())
                .clientName("test")
                .billingAddress("test")
                .notes("test")
                .paymentInstructions("test")
                .amount(20.0)
                .build();

        invoiceRepository.save(invoice);

        boolean found = invoiceRepository.existsByTitle("Test Project Invoice #1");

        assertThat(found).isTrue();
    }

    @Test
    public void shouldReturnFalseWhenInvoiceDoesNotExistByTitle() {
        Invoice invoice = Invoice.builder()
                .title("Test Project Invoice #2")
                .status(InvoiceStatus.UNPAID)
                .issueDate(LocalDateTime.now())
                .dueDate(LocalDateTime.now())
                .clientName("test")
                .billingAddress("test")
                .notes("test")
                .paymentInstructions("test")
                .amount(20.0)
                .build();

        invoiceRepository.save(invoice);

        boolean found = invoiceRepository.existsByTitle("fake title");

        assertThat(found).isFalse();
    }
}
