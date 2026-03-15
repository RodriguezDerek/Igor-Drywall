package com.project.backend.project;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "material_types")
public class MaterialType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dimension", nullable = false)
    @NotBlank(message = "Dimension is required")
    private String dimension;

    @Column(name = "basement", nullable = false)
    private Integer basement;

    @Column(name = "first_floor", nullable = false)
    private Integer firstFloor;

    @Column(name = "second_floor", nullable = false)
    private Integer secondFloor;

    @Column(name = "third_floor", nullable = false)
    private Integer thirdFloor ;

    @Column(name = "attic", nullable = false)
    private Integer attic;

    @Column(name = "garage", nullable = false)
    private Integer garage;

    @Column(name = "above_garage", nullable = false)
    private Integer aboveGarage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_sheet_id", nullable = false)
    @JsonBackReference
    private MaterialSheet materialSheet;
}
