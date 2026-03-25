package com.project.backend.project;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.backend.enums.ProjectPriority;
import com.project.backend.enums.ProjectStatus;
import com.project.backend.enums.ServiceType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, unique = true)
    @NotBlank(message = "Title is required")
    private String title;

    @Column(name = "address", nullable = false)
    @NotBlank(message = "Address is required")
    private String address;

    @Column(name = "service_type", nullable = false)
    @NotNull(message = "Service type is required")
    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    @Column(name = "project_status", nullable = false)
    @NotNull(message = "Project status is required")
    @Enumerated(EnumType.STRING)
    private ProjectStatus projectStatus;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "priority", nullable = false)
    @NotNull(message = "Project priority is required")
    @Enumerated(EnumType.STRING)
    private ProjectPriority priority;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "notes", nullable = false)
    private String notes;

    @Column(name = "client_name", nullable = false)
    @NotBlank(message = "Client name is required")
    private String clientName;

    @Column(name = "client_phone_number", nullable = false)
    @NotBlank(message = "Client phone number is required")
    private String clientPhoneNumber;

    @Column(name = "client_email", nullable = false)
    @NotBlank(message = "Client email is required")
    private String clientEmail;

    @Column(name = "budget_range", nullable = false)
    @NotBlank(message = "Budget range is required")
    private String budgetRange;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<MaterialSheet> materialList;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        lastUpdated = now;
    }
}
