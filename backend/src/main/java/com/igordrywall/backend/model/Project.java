package com.igordrywall.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "projects", nullable = false)
    private Integer id;

    @NotEmpty(message = "Project name is required")
    @Column(name = "name", nullable = false)
    private String name;

    @NotEmpty(message = "Job address is required")
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull(message = "Date is required")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotEmpty(message = "Status is required")
    @Column(name = "project_status", nullable = false)
    private String projectStatus;

    @NotEmpty(message = "Team is required")
    @Column(name = "team", nullable = false)
    private String team;

    @Column(name = "client_name")
    private String clientName;

    @Column(name = "client_phone_number")
    private String clientPhoneNumber;

    @Column(name = "contractor_name")
    private String contractorName;

    @Column(name = "contractor_phone_number")
    private String contractorPhoneNumber;

    @Column(name = "description")
    private String description;

    @Min(value = 0, message = "Drywall amount can't be negative")
    @Column(name = "total_drywall")
    private Integer totalDrywall = 0;
}