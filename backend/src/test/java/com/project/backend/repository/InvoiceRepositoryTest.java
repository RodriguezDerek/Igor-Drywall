package com.project.backend.repository;

import com.project.backend.invoice.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

@DataJpaTest
public class InvoiceRepositoryTest {

    @Autowired
    private InvoiceRepository invoiceRepository;
}
