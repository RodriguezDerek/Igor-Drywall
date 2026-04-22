package com.project.backend.material;

import com.project.backend.DTO.material.CreateMaterialSheetRequestDTO;
import com.project.backend.DTO.material.UpdateMaterialSheetRequestDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/materials")

public class MaterialSheetController {

    private final MaterialSheetService materialSheetService;

    @PostMapping("/project/{projectId}/material")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> createMaterialSheet(@Valid @RequestBody CreateMaterialSheetRequestDTO request, @PathVariable Long projectId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(materialSheetService.createMaterialSheet(request, projectId));
    }

    @PutMapping("/material/{projectId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> updateMaterialSheet(@Valid @RequestBody UpdateMaterialSheetRequestDTO request, @PathVariable Long projectId) {
        return ResponseEntity.status(HttpStatus.OK).body(materialSheetService.updateMaterialSheet(request, projectId));
    }
}
