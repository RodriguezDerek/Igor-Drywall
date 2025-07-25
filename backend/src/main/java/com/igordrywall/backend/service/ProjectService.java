package com.igordrywall.backend.service;

import com.igordrywall.backend.DTO.common.GenericResponse;
import com.igordrywall.backend.DTO.project.*;
import com.igordrywall.backend.exception.ProjectAlreadyExistsException;
import com.igordrywall.backend.exception.ProjectNotFoundException;
import com.igordrywall.backend.model.Project;
import com.igordrywall.backend.repository.ProjectRepository;
import com.igordrywall.backend.repository.UserRepository;
import com.igordrywall.backend.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

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

    public List<ProjectCalendarDTO> getProjectsByMonth(Integer year, Integer month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.withDayOfMonth(startOfMonth.lengthOfMonth());
        List<Project> projectList = projectRepository.findByStartDateBetween(startOfMonth, endOfMonth);
        return projectList.stream().map(this::toProjectCalendarDTO).toList();
    }

    public ProjectCalendarDTO toProjectCalendarDTO(Project project){
        return ProjectCalendarDTO.builder()
                .name(project.getName())
                .address(project.getAddress())
                .team(project.getTeam())
                .date(project.getStartDate())
                .build();
    }

    public YearlyDrywallProjects getProjectsGraphData(Integer year){
        return YearlyDrywallProjects.builder()
                .januaryProjects(getCountByMonthHelper(year, 1))
                .februaryProjects(getCountByMonthHelper(year, 2))
                .marchProjects(getCountByMonthHelper(year, 3))
                .aprilProjects(getCountByMonthHelper(year, 4))
                .mayProjects(getCountByMonthHelper(year, 5))
                .juneProjects(getCountByMonthHelper(year, 6))
                .julyProjects(getCountByMonthHelper(year, 7))
                .augustProjects(getCountByMonthHelper(year, 8))
                .septemberProjects(getCountByMonthHelper(year, 9))
                .octoberProjects(getCountByMonthHelper(year, 10))
                .novemberProjects(getCountByMonthHelper(year, 11))
                .decemberProjects(getCountByMonthHelper(year, 12))
                .build();
    }

    private Integer getCountByMonthHelper(Integer year, Integer month){
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.withDayOfMonth(startOfMonth.lengthOfMonth()).plusDays(1);
        return projectRepository.drywallProjectsThisMonth(startOfMonth, endOfMonth);
    }

    public ProjectDashboardDTO getProjectDashboardInfo() {
        return ProjectDashboardDTO.builder()
                .projectsThisWeek(projectsThisWeekHelper())
                .projectsCompletedThisMonth(projectsCompletedThisMonthHelper())
                .numberOfWorkers(totalUsersByRoleHelper())
                .drywallSheetsThisMonth(drywallSheetsThisMonthHelper())
                .mostRecentProject(mostRecentProjectHelper())
                .totalProjects(totalProjectsHelper())
                .build();
    }

    private Integer projectsThisWeekHelper(){
        LocalDate weekStart = LocalDate.now().with(DayOfWeek.MONDAY);
        LocalDate weekEnd = weekStart.plusDays(7);
        return projectRepository.totalProjectsByWeek(weekStart, weekEnd);
    }

    private Integer projectsCompletedThisMonthHelper(){
        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1);
        return projectRepository.countCompletedProjectsInMonth(startOfMonth, endOfMonth);
    }

    private Integer totalUsersByRoleHelper(){
        return userRepository.totalUsersByRole(Role.WORKER);
    }

    private Integer drywallSheetsThisMonthHelper(){
        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1);
        return projectRepository.drywallSheetsThisMonth(startOfMonth, endOfMonth);
    }

    private ProjectSummaryDTO mostRecentProjectHelper(){
        Optional<Project> optionalProject = projectRepository.findTopByOrderByIdDesc();
        if(optionalProject.isEmpty()){
            throw new ProjectNotFoundException("No Projects created");
        }

        Project project = optionalProject.get();

        return ProjectSummaryDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .clientName(project.getClientName())
                .address(project.getAddress())
                .startDate(project.getStartDate())
                .build();
    }

    private Integer totalProjectsHelper(){
        return projectRepository.getTotalDrywallProjects();
    }
}
