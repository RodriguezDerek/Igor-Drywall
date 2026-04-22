package com.project.backend.project;

import com.project.backend.DTO.project.ProjectDTO;
import com.project.backend.DTO.project.ProjectRequestDTO;
import com.project.backend.DTO.project.ProjectTableDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.enums.ProjectStatus;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping("/project")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> createProject(@Valid @RequestBody ProjectRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(request));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','WORKER')")
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getAllProjects());
    }

    @GetMapping("/calendar")
    @PreAuthorize("hasAnyRole('ADMIN', 'WORKER')")
    public ResponseEntity<List<ProjectTableDTO>> getProjectsByMonth(@RequestParam String month) {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getProjectsByMonth(month));
    }

    @GetMapping("/table")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProjectTableDTO>> getTableProjects() {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getTableProjects());
    }

//    @GetMapping("/search")
//    @PreAuthorize("hasAnyRole('ADMIN','WORKER')")
//    public ResponseEntity<List<ProjectDTO>> getJobsByStatus(@RequestParam ProjectStatus status, @RequestParam String direction) {
//        return ResponseEntity.status(HttpStatus.OK).body(projectService.getProjectsByStatus(status, direction));
//    }

    @PutMapping("/project/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> updateProject(@Valid @RequestBody ProjectRequestDTO request, @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.updateProject(request, id));
    }

    @DeleteMapping("/project/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> deleteProject(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.deleteProject(id));
    }
}
