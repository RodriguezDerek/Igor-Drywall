package com.project.backend.dashboard;

import com.project.backend.DTO.dashboard.DashboardStatsDTO;
import com.project.backend.DTO.dashboard.InvoiceStatsDTO;
import com.project.backend.enums.InvoiceStatus;
import com.project.backend.enums.ProjectStatus;
import com.project.backend.enums.UserRole;
import com.project.backend.invoice.Invoice;
import com.project.backend.invoice.InvoiceRepository;
import com.project.backend.project.ProjectRepository;
import com.project.backend.quote.QuoteRepository;
import com.project.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final QuoteRepository quoteRepository;
    private final InvoiceRepository invoiceRepository;

    public DashboardStatsDTO getDashboardStats() {
        long activeJobs = projectRepository.countByProjectStatus(ProjectStatus.ACTIVE);
        long totalQuotes = quoteRepository.count();
        long unpaidInvoices = invoiceRepository.countByStatus(InvoiceStatus.UNPAID);
        long totalWorkers = userRepository.countByRole(UserRole.WORKER);

        return DashboardStatsDTO.builder()
                .activeJobs(activeJobs)
                .totalQuotes(totalQuotes)
                .unpaidInvoices(unpaidInvoices)
                .totalWorkers(totalWorkers)
                .build();
    }

    public InvoiceStatsDTO getInvoiceStats() {
        LocalDateTime startOfMonth = LocalDateTime.now()
                .withDayOfMonth(1)
                .toLocalDate()
                .atStartOfDay();

        LocalDateTime endOfMonth = LocalDateTime.now()
                .withDayOfMonth(1)
                .plusMonths(1)
                .minusNanos(1);

        long totalInvoices = invoiceRepository.count();
        long unpaidInvoices = invoiceRepository.countByStatus(InvoiceStatus.UNPAID);
        double totalReceived = invoiceRepository.findByStatus(InvoiceStatus.PAID).stream().mapToDouble(Invoice::getAmount).sum();
        long paidThisMonth = invoiceRepository.countByStatusAndCreatedAtBetween(InvoiceStatus.PAID, startOfMonth, endOfMonth);

        return InvoiceStatsDTO.builder()
                .totalInvoices(totalInvoices)
                .unpaidInvoices(unpaidInvoices)
                .totalReceived(totalReceived)
                .paidThisMonth(paidThisMonth)
                .build();
    }
}
