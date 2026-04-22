package com.project.backend.material;

import com.project.backend.DTO.material.CreateMaterialSheetRequestDTO;
import com.project.backend.DTO.material.MaterialTypeRequestDTO;
import com.project.backend.DTO.material.UpdateMaterialSheetRequestDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.exceptions.MaterialSheetNotFoundException;
import com.project.backend.exceptions.MaterialTypeNotFoundException;
import com.project.backend.exceptions.ProjectNotFoundException;
import com.project.backend.project.Project;
import com.project.backend.project.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MaterialSheetService {

    private final ProjectRepository projectRepository;
    private final MaterialSheetRepository materialSheetRepository;

    public GenericResponseDTO createMaterialSheet(CreateMaterialSheetRequestDTO request, Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project with id " + projectId + " not found"));

        MaterialSheet materialSheet = MaterialSheet.builder()
                .thickness(request.getThickness())
                .project(project)
                .build();

        materialSheetRepository.save(materialSheet);

        return GenericResponseDTO.builder()
                .message("Material sheet created successfully")
                .status(HttpStatus.CREATED.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponseDTO updateMaterialSheet(UpdateMaterialSheetRequestDTO request, Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found"));

        MaterialSheet materialSheetToUpdate = project.getMaterialList().stream()
                .filter(sheet -> sheet.getThickness().equals(request.getMaterialThickness()))
                .findFirst()
                .orElseThrow(() -> new MaterialSheetNotFoundException("Material sheet with thickness " + request.getMaterialThickness() + " not found"));

        materialSheetToUpdate.setNotes(request.getNotes());

        List<MaterialType> existingMaterials = materialSheetToUpdate.getMaterialTypes();

        // 1. Remove deleted materials
        existingMaterials.removeIf(existingMaterial ->
                    request.getMaterialTypes().stream()
                            .noneMatch(reqMaterial ->
                                    reqMaterial.getId() != null && reqMaterial.getId().equals(existingMaterial.getId())
                            )
        );

            // 2. Update existing + add new
        for (MaterialTypeRequestDTO materialRequest : request.getMaterialTypes()) {

                // NEW item
                if (materialRequest.getId() == null) {
                    MaterialType newMaterialType = MaterialType.builder()
                            .dimension(materialRequest.getDimension())
                            .basement(materialRequest.getBasement())
                            .firstFloor(materialRequest.getFirstFloor())
                            .secondFloor(materialRequest.getSecondFloor())
                            .thirdFloor(materialRequest.getThirdFloor())
                            .attic(materialRequest.getAttic())
                            .garage(materialRequest.getGarage())
                            .aboveGarage(materialRequest.getAboveGarage())
                            .build();

                    existingMaterials.add(newMaterialType);
                }

                // EXISTING item
                else {
                    MaterialType existingMaterialType = existingMaterials.stream()
                            .filter(material -> material.getId().equals(materialRequest.getId()))
                            .findFirst()
                            .orElseThrow(() -> new MaterialTypeNotFoundException("Material Type not found"));

                    existingMaterialType.setDimension(materialRequest.getDimension());
                    existingMaterialType.setBasement(materialRequest.getBasement());
                    existingMaterialType.setFirstFloor(materialRequest.getFirstFloor());
                    existingMaterialType.setSecondFloor(materialRequest.getSecondFloor());
                    existingMaterialType.setThirdFloor(materialRequest.getThirdFloor());
                    existingMaterialType.setAboveGarage(materialRequest.getAboveGarage());
                    existingMaterialType.setGarage(materialRequest.getGarage());
                    existingMaterialType.setAboveGarage(materialRequest.getAboveGarage());
                }
        }

        materialSheetRepository.save(materialSheetToUpdate);

        return GenericResponseDTO.builder()
                .message("Material Sheets updated successfully")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }
}
