package com.project.backend.project;

import com.project.backend.DTO.project.ProjectDTO;
import com.project.backend.DTO.project.ProjectRequestDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.enums.ProjectStatus;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping("/project")
    public ResponseEntity<GenericResponseDTO> createProject(@Valid @RequestBody ProjectRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(request));
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getAllProjects());
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProjectDTO>> getJobsByStatus(@RequestParam ProjectStatus status, @RequestParam String direction) {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getProjectsByStatus(status, direction));
    }
}
