package com.project.backend.dashboard;

import com.project.backend.DTO.dashboard.DashboardStatsDTO;
import com.project.backend.DTO.dashboard.InvoiceStatsDTO;
import com.project.backend.invoice.InvoiceRepository;
import com.project.backend.project.ProjectRepository;
import com.project.backend.quote.QuoteRepository;
import com.project.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final QuoteRepository quoteRepository;
    private final InvoiceRepository invoiceRepository;

    public DashboardStatsDTO getDashboardStats() {
        return DashboardStatsDTO.builder().build();
    }

    public InvoiceStatsDTO getInvoiceStats() {
        return InvoiceStatsDTO.builder().build();
    }
}
