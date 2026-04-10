package com.project.backend.DTO.material;

import com.project.backend.enums.MaterialThickness;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMaterialSheetRequestDTO {
    private MaterialThickness materialThickness;
    private List<MaterialTypeRequestDTO> materialTypes;
    private String notes;
}
