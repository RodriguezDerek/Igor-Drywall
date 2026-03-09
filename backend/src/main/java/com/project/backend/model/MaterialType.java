package com.project.backend.model;

import jakarta.persistence.*;
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
}
