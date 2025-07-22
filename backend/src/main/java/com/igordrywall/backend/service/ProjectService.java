package com.igordrywall.backend.service;

import com.igordrywall.backend.DTO.common.GenericResponse;
import com.igordrywall.backend.DTO.project.CreateProjectRequest;
import com.igordrywall.backend.DTO.project.ProjectDTO;
import com.igordrywall.backend.DTO.project.ProjectSummaryDTO;
import com.igordrywall.backend.DTO.project.UpdateProjectRequest;
import com.igordrywall.backend.exception.ProjectAlreadyExistsException;
import com.igordrywall.backend.exception.ProjectNotFoundException;
import com.igordrywall.backend.model.Project;
import com.igordrywall.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<ProjectSummaryDTO> getAllProjects() {
        List<Project> projectList = projectRepository.findAll();
        return projectList.stream().map(this::toProjectSummaryDTO).toList();
    }

    public GenericResponse deleteProject(Integer id) {
        Optional<Project> optionalProject = projectRepository.findById(id);

        if(optionalProject.isEmpty()){
            throw new ProjectNotFoundException("Project not found");
        }

        projectRepository.delete(optionalProject.get());

        return GenericResponse.builder()
                .message("Project deleted successfully")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponse addProject(CreateProjectRequest request) {
        Optional<Project> optionalProject = projectRepository.findByNameIgnoreCaseAndAddressIgnoreCase(
                request.getName(), request.getAddress());

        if (optionalProject.isPresent()) {
            throw new ProjectAlreadyExistsException("Project already exists");
        }

        Project project = Project.builder()
                .name(request.getName())
                .address(request.getAddress())
                .startDate(request.getStartDate())
                .projectStatus(request.getProjectStatus())
                .team(request.getTeam())
                .clientName(request.getClientName() != null ? request.getClientName() : "No client name provided")
                .clientPhoneNumber(request.getClientPhoneNumber() != null ? request.getClientPhoneNumber() : "No client phone number provided")
                .contractorName(request.getContractorName() != null ? request.getContractorName() : "No contractor name provided")
                .contractorPhoneNumber(request.getContractorPhoneNumber() != null ? request.getContractorPhoneNumber() : "No contractor phone number provided")
                .description(request.getDescription() != null ? request.getDescription() : "No description provided")
                .totalDrywall(0)
                .build();

        projectRepository.save(project);

        return GenericResponse.builder()
                .message("Project created successfully")
                .status(HttpStatus.CREATED.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public ProjectDTO getProject(Integer id) {
        Optional<Project> optionalProject = projectRepository.findById(id);

        if(optionalProject.isEmpty()){
            throw new ProjectNotFoundException("Project not found");
        }

        Project project = optionalProject.get();

        return ProjectDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .clientName(project.getClientName())
                .clientPhoneNumber(project.getClientPhoneNumber())
                .contractorName(project.getContractorName())
                .contractorPhoneNumber(project.getContractorPhoneNumber())
                .startDate(project.getStartDate())
                .projectStatus(project.getProjectStatus())
                .team(project.getTeam())
                .address(project.getAddress())
                .description(project.getDescription())
                .totalDrywall(project.getTotalDrywall())
                .build();
    }

    public ProjectSummaryDTO toProjectSummaryDTO(Project project){
        return ProjectSummaryDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .address(project.getAddress())
                .clientName(project.getClientName())
                .startDate(project.getStartDate())
                .build();
    }

    public GenericResponse updateProject(Integer id, UpdateProjectRequest request) {
        Optional<Project> optionalProject = projectRepository.findById(id);

        if(optionalProject.isEmpty()){
            throw new ProjectNotFoundException("Project not found");
        }

        Project project = optionalProject.get();
        project.setName(request.getName());
        project.setClientName(request.getClientName());
        project.setClientPhoneNumber(request.getClientPhoneNumber());
        project.setContractorName(request.getContractorName());
        project.setContractorPhoneNumber(request.getContractorPhoneNumber());
        project.setStartDate(request.getStartDate());
        project.setProjectStatus(request.getProjectStatus());
        project.setTeam(request.getTeam());
        project.setAddress(request.getAddress());
        project.setDescription(request.getDescription());
        project.setTotalDrywall(request.getTotalDrywall());

        projectRepository.save(project);

        return GenericResponse.builder()
                .message("Project updated successfully")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }
}
