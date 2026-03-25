package com.project.backend.project;

import com.project.backend.DTO.project.ProjectDTO;
import com.project.backend.DTO.project.ProjectRequestDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.S3.S3Service;
import com.project.backend.enums.ProjectStatus;
import com.project.backend.exceptions.ProjectExistsException;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final S3Service s3Service;

    public GenericResponseDTO createProject(ProjectRequestDTO request) {
        if (projectRepository.findByTitle(request.getJobTitle()).isPresent()) {
            throw new ProjectExistsException("Project with given name already exists.");
        }

        Project project = Project.builder()
                .title(request.getJobTitle())
                .address(request.getAddress())
                .serviceType(request.getServiceType())
                .projectStatus(request.getStatus())
                .startDate(request.getStartDate())
                .startTime(request.getStartTime())
                .priority(request.getPriority())
                .description(request.getProjectDescription())
                .notes(request.getNotes())
                .clientName(request.getClientName())
                .clientEmail(request.getClientEmail())
                .clientPhoneNumber(request.getClientPhoneNumber())
                .budgetRange(request.getBudgetRange())
                .lastUpdated(LocalDateTime.now())
                .build();

        projectRepository.save(project);

        return GenericResponseDTO.builder()
                .message("Project created successfully")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream().map(this::toProjectDTO).toList();
    }

    public List<ProjectDTO> getProjectsByStatus(ProjectStatus status, String direction) {
        Sort sort = Sort.by("createdAt");

        //Default
        sort= sort.ascending();

        if ("DESC".equalsIgnoreCase(direction)) {
            sort = sort.descending();
        }

        return projectRepository.findByProjectStatus(status, sort).stream().map(this::toProjectDTO).toList();
    }

    private ProjectDTO toProjectDTO(Project project) {
        return ProjectDTO.builder()
                .id(project.getId())
                .title(project.getTitle())
                .address(project.getAddress())
                .serviceType(project.getServiceType())
                .projectStatus(project.getProjectStatus())
                .startDate(project.getStartDate())
                .startTime(project.getStartTime())
                .priority(project.getPriority())
                .description(project.getDescription())
                .notes(project.getNotes())
                .clientName(project.getClientName())
                .clientPhoneNumber(project.getClientPhoneNumber())
                .clientEmail(project.getClientEmail())
                .budgetRange(project.getBudgetRange())
                .lastUpdated(project.getLastUpdated())
                .createdAt(project.getCreatedAt())
                .materialList(project.getMaterialList())
                .build();
    }
}
