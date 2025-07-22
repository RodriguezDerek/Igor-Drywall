package com.igordrywall.backend.controller;

import com.igordrywall.backend.DTO.common.GenericResponse;
import com.igordrywall.backend.DTO.project.CreateProjectRequest;
import com.igordrywall.backend.DTO.project.ProjectDTO;
import com.igordrywall.backend.DTO.project.ProjectSummaryDTO;
import com.igordrywall.backend.DTO.project.UpdateProjectRequest;
import com.igordrywall.backend.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping("/add")
    public ResponseEntity<GenericResponse> addProject(@Valid @RequestBody CreateProjectRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.addProject(request));
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectSummaryDTO>> getAllProjects(){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getAllProjects());
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectDTO> findProject(@PathVariable Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getProject(id));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<GenericResponse> updateProject(@PathVariable Integer id, @Valid @RequestBody UpdateProjectRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.updateProject(id, request));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<GenericResponse> deleteProject(@PathVariable Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.deleteProject(id));
    }
}
