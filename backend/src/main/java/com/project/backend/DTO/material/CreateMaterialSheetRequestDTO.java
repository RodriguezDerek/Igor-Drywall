package com.project.backend.DTO.material;

import com.project.backend.enums.MaterialThickness;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateMaterialSheetRequestDTO {
    @NotNull(message = "Material Sheet thickness is required")
    private MaterialThickness thickness;
}
