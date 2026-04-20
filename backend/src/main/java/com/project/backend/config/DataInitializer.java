package com.project.backend.config;

import com.project.backend.enums.*;
import com.project.backend.invoice.Invoice;
import com.project.backend.invoice.InvoiceItem;
import com.project.backend.invoice.InvoiceRepository;
import com.project.backend.project.Project;
import com.project.backend.project.ProjectRepository;
import com.project.backend.quote.Quote;
import com.project.backend.quote.QuoteRepository;
import com.project.backend.user.User;
import com.project.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final QuoteRepository quoteRepository;
    private final InvoiceRepository invoiceRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${admin.phoneNumber}")
    private String adminPhoneNumber;

    @Bean
    CommandLineRunner createAdminAccount() {
        return args -> {
            if(userRepository.findByEmail(adminEmail).isEmpty()){
                User admin = User.builder()
                        .firstName("Igor")
                        .lastName("Rodriguez")
                        .email(adminEmail)
                        .phoneNumber(adminPhoneNumber)
                        .password(passwordEncoder.encode(adminPassword))
                        .dateAdded(LocalDate.now())
                        .role(UserRole.ADMIN)
                        .createdAt(LocalDateTime.now())
                        .isAccountNonExpired(true)
                        .isAccountNonLocked(true)
                        .isCredentialsNonExpired(true)
                        .isEnabled(true)
                        .build();

                List<Project> projects = projectExamples();
                List<User> users = userExamples();
                List<Quote> quotes = quoteExamples();
                List<Invoice> invoices = invoiceExamples();

                invoiceRepository.saveAll(invoices);
                projectRepository.saveAll(projects);
                quoteRepository.saveAll(quotes);
                userRepository.saveAll(users);
                userRepository.save(admin);
                System.out.println("Admin account created");
            }
        };
    }

    private List<Project> projectExamples() {
        return List.of(
                Project.builder()
                        .title("Kitchen Remodel")
                        .address("123 Main St, Hartford, CT")
                        .serviceType(ServiceType.COMMERCIAL_DRYWALL)
                        .projectStatus(ProjectStatus.ACTIVE)
                        .startDate(LocalDateTime.of(2026, 4, 10, 9, 0))
                        .startTime(LocalTime.of(9, 0))
                        .priority(ProjectPriority.HIGH)
                        .description("Full kitchen renovation")
                        .notes("Use eco-friendly materials")
                        .clientName("John Smith")
                        .clientPhoneNumber("860-555-1234")
                        .clientEmail("john.smith@email.com")
                        .budgetRange("$15,000 - $25,000")
                        .build(),

                Project.builder()
                        .title("Bathroom Upgrade")
                        .address("45 Elm St, New Haven, CT")
                        .serviceType(ServiceType.DRYWALL_INSTALLATION)
                        .projectStatus(ProjectStatus.PENDING)
                        .startDate(LocalDateTime.of(2026, 4, 20, 10, 30))
                        .startTime(LocalTime.of(10, 30))
                        .priority(ProjectPriority.MEDIUM)
                        .description("Upgrade fixtures and repaint")
                        .notes("Finish before May")
                        .clientName("Sarah Johnson")
                        .clientPhoneNumber("203-555-5678")
                        .clientEmail("sarah.j@email.com")
                        .budgetRange("$5,000 - $8,000")
                        .build(),

                Project.builder()
                        .title("Roof Replacement")
                        .address("78 Oak Ave, Stamford, CT")
                        .serviceType(ServiceType.MULTIPLE)
                        .projectStatus(ProjectStatus.COMPLETED)
                        .startDate(LocalDateTime.of(2026, 5, 1, 8, 0))
                        .startTime(LocalTime.of(8, 0))
                        .priority(ProjectPriority.HIGH)
                        .description("Replace roof with shingles")
                        .notes("Weather dependent")
                        .clientName("Michael Brown")
                        .clientPhoneNumber("203-555-9012")
                        .clientEmail("m.brown@email.com")
                        .budgetRange("$12,000 - $18,000")
                        .build(),

                Project.builder()
                        .title("Office Renovation")
                        .address("200 State St, Hartford, CT")
                        .serviceType(ServiceType.COMMERCIAL_DRYWALL)
                        .projectStatus(ProjectStatus.ACTIVE)
                        .startDate(LocalDateTime.of(2026, 4, 10, 9, 0))
                        .startTime(LocalTime.of(9, 0))
                        .priority(ProjectPriority.MEDIUM)
                        .description("Modernize office interior with new drywall and layout adjustments")
                        .notes("Coordinate with building management for access")
                        .clientName("Emily Carter")
                        .clientPhoneNumber("860-555-7788")
                        .clientEmail("emily.carter@email.com")
                        .budgetRange("$20,000 - $35,000")
                        .build(),

                Project.builder()
                        .title("Retail Store Buildout")
                        .address("15 Broad St, Stamford, CT")
                        .serviceType(ServiceType.COMMERCIAL_DRYWALL)
                        .projectStatus(ProjectStatus.PENDING)
                        .startDate(LocalDateTime.of(2026, 4, 10, 9, 0))
                        .startTime(LocalTime.of(9, 0))
                        .priority(ProjectPriority.HIGH)
                        .description("Interior drywall installation for new retail space")
                        .notes("Ensure compliance with mall construction guidelines")
                        .clientName("David Nguyen")
                        .clientPhoneNumber("203-555-3344")
                        .clientEmail("d.nguyen@email.com")
                        .budgetRange("$25,000 - $40,000")
                        .build(),

                Project.builder()
                        .title("Basement Finishing Project")
                        .address("88 Pine St, New Haven, CT")
                        .serviceType(ServiceType.DRYWALL_INSTALLATION)
                        .projectStatus(ProjectStatus.ACTIVE)
                        .startDate(LocalDateTime.of(2026, 4, 10, 9, 0))
                        .startTime(LocalTime.of(9, 0))
                        .priority(ProjectPriority.LOW)
                        .description("Finish basement walls and ceilings with drywall installation")
                        .notes("Customer prefers noise work after 10 AM")
                        .clientName("Laura Mitchell")
                        .clientPhoneNumber("203-555-6677")
                        .clientEmail("laura.mitchell@email.com")
                        .budgetRange("$8,000 - $12,000")
                        .build()
        );
    }

    private List<User> userExamples() {


        return List.of(
                User.builder()
                        .firstName("John")
                        .lastName("Smith")
                        .email("john.smith@email.com")
                        .phoneNumber("860-555-1111")
                        .password("password123") // replace with encoded password in real app
                        .role(UserRole.WORKER)
                        .isEnabled(true)
                        .dateAdded(LocalDate.now())
                        .build(),

                User.builder()
                        .firstName("Sarah")
                        .lastName("Johnson")
                        .email("sarah.johnson@email.com")
                        .phoneNumber("860-555-2222")
                        .password("password123")
                        .role(UserRole.WORKER)
                        .isEnabled(true)
                        .dateAdded(LocalDate.now())
                        .build(),

                User.builder()
                        .firstName("Michael")
                        .lastName("Brown")
                        .email("michael.brown@email.com")
                        .phoneNumber("860-555-3333")
                        .password("password123")
                        .role(UserRole.WORKER)
                        .isEnabled(true)
                        .dateAdded(LocalDate.now())
                        .build(),

                User.builder()
                        .firstName("Emily")
                        .lastName("Davis")
                        .email("emily.davis@email.com")
                        .phoneNumber("860-555-4444")
                        .password("password123")
                        .role(UserRole.WORKER)
                        .isEnabled(false)
                        .dateAdded(LocalDate.now())
                        .build()
        );
    }

    private List<Quote> quoteExamples() {
        return List.of(
                Quote.builder()
                        .firstName("John")
                        .lastName("Smith")
                        .email("john.smith@email.com")
                        .phoneNumber("860-555-1234")
                        .propertyAddress("123 Main St, Hartford, CT")
                        .serviceType(ServiceType.MULTIPLE)
                        .propertyType(PropertyType.RESIDENTIAL_APARTMENT)
                        .projectDescription("Full kitchen renovation including cabinets and flooring")
                        .budgetRange("$15,000 - $25,000")
                        .startDate(LocalDate.of(2026, 5, 1))
                        .build(),

                Quote.builder()
                        .firstName("Sarah")
                        .lastName("Johnson")
                        .email("sarah.johnson@email.com")
                        .phoneNumber("203-555-5678")
                        .propertyAddress("45 Elm St, New Haven, CT")
                        .serviceType(ServiceType.MULTIPLE)
                        .propertyType(PropertyType.RESIDENTIAL_APARTMENT)
                        .projectDescription("Bathroom upgrade with new fixtures and paint")
                        .budgetRange("$5,000 - $8,000")
                        .startDate(LocalDate.of(2026, 5, 15))
                        .build(),

                Quote.builder()
                        .firstName("Michael")
                        .lastName("Brown")
                        .email("michael.brown@email.com")
                        .phoneNumber("203-555-9012")
                        .propertyAddress("78 Oak Ave, Stamford, CT")
                        .serviceType(ServiceType.MULTIPLE)
                        .propertyType(PropertyType.RESIDENTIAL_APARTMENT)
                        .projectDescription("Install new roofing system for office building")
                        .budgetRange("$20,000 - $35,000")
                        .startDate(LocalDate.of(2026, 6, 1))
                        .build(),

                Quote.builder()
                        .firstName("Emily")
                        .lastName("Davis")
                        .email("emily.davis@email.com")
                        .phoneNumber("475-555-3344")
                        .propertyAddress("200 Business Park Dr, Bridgeport, CT")
                        .serviceType(ServiceType.SKIM_COAT)
                        .propertyType(PropertyType.RESIDENTIAL_APARTMENT)
                        .projectDescription("Routine maintenance and repainting of office interior")
                        .budgetRange("$2,000 - $4,000")
                        .startDate(LocalDate.of(2026, 4, 25))
                        .build()
        );
    }

    private List<Invoice> invoiceExamples() {

        Invoice invoice1 = Invoice.builder()
                .title("Ben Lee")
                .status(InvoiceStatus.PAID)
                .issueDate(LocalDateTime.now())
                .dueDate(LocalDateTime.now().plusDays(7))
                .clientName("Derek")
                .billingAddress("7 Hill Drive, Masonry & Tile Work")
                .notes("Notes")
                .paymentInstructions("Bank transfer within 7 days")
                .amount(600.0)
                .build();

        List<InvoiceItem> items1 = List.of(
                InvoiceItem.builder()
                        .description("HVAC System Inspection")
                        .quantity(1)
                        .unitPrice(250.0)
                        .total(250.0)
                        .invoice(invoice1)
                        .build(),

                InvoiceItem.builder()
                        .description("Air Filter Replacement")
                        .quantity(2)
                        .unitPrice(75.0)
                        .total(150.0)
                        .invoice(invoice1)
                        .build(),

                InvoiceItem.builder()
                        .description("Duct Cleaning Service")
                        .quantity(1)
                        .unitPrice(200.0)
                        .total(200.0)
                        .invoice(invoice1)
                        .build()
        );

        invoice1.setItems(items1);

        return List.of(invoice1);
    }
}
