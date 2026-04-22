package com.project.backend.DTO.material;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MaterialTypeRequestDTO {
    private Long id;

    @NotBlank(message = "Dimension is required")
    private String dimension;

    @Min(value = 0, message = "Basement value cannot be negative")
    private Integer basement;

    @Min(value = 0, message = "First floor value cannot be negative")
    private Integer firstFloor;

    @Min(value = 0, message = "Second floor value cannot be negative")
    private Integer secondFloor;

    @Min(value = 0, message = "Third floor value cannot be negative")
    private Integer thirdFloor;

    @Min(value = 0, message = "Attic value cannot be negative")
    private Integer attic;

    @Min(value = 0, message = "Garage value cannot be negative")
    private Integer garage;

    @Min(value = 0, message = "Above Garage value cannot be negative")
    private Integer aboveGarage;
}
