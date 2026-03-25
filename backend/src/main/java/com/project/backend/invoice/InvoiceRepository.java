package com.project.backend.invoice;

import com.project.backend.enums.InvoiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    boolean existsByTitle(String title);

    List<Invoice> findByStatus(InvoiceStatus status);}
