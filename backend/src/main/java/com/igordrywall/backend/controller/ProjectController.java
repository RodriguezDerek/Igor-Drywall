package com.igordrywall.backend.controller;

import com.igordrywall.backend.DTO.common.GenericResponseDTO;
import com.igordrywall.backend.DTO.project.*;
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
    public ResponseEntity<GenericResponseDTO> addProject(@Valid @RequestBody CreateProjectRequestDTO request){
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.addProject(request));
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> getAllProjects(){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getAllProjects());
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectDTO> findProject(@PathVariable Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getProject(id));
    }

    @GetMapping("/projects/schedule")
    public ResponseEntity<List<ProjectCalendarDTO>> getProjectsByMonth(@RequestParam Integer year, @RequestParam Integer month){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getProjectsByMonth(year, month));
    }

    @GetMapping("/projects/graph")
    public ResponseEntity<YearlyDrywallProjectsDTO> getProjectsGraph(@RequestParam Integer year){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getProjectsGraphData(year));
    }

    @GetMapping("/projects/dashboard")
    public ResponseEntity<ProjectDashboardDTO> getDashboard(){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getProjectDashboardInfo());
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<GenericResponseDTO> updateProject(@PathVariable Integer id, @Valid @RequestBody UpdateProjectRequestDTO request){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.updateProject(id, request));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<GenericResponseDTO> deleteProject(@PathVariable Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.deleteProject(id));
    }
}
