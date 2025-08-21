package com.igordrywall.backend.service;

import com.igordrywall.backend.DTO.common.GenericResponseDTO;
import com.igordrywall.backend.DTO.project.*;
import com.igordrywall.backend.S3.S3Service;
import com.igordrywall.backend.exception.ProjectAlreadyExistsException;
import com.igordrywall.backend.exception.ProjectNotFoundException;
import com.igordrywall.backend.model.Project;
import com.igordrywall.backend.repository.ProjectRepository;
import com.igordrywall.backend.repository.UserRepository;
import com.igordrywall.backend.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
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
    private final S3Service s3Service;

    public List<ProjectDTO> getAllProjects() {
        List<Project> projectList = projectRepository.findAll();
        return projectList.stream().map(this::toProjectDTO).toList();
    }

    public GenericResponseDTO deleteProject(Integer id) {
        Optional<Project> optionalProject = projectRepository.findById(id);

        if(optionalProject.isEmpty()){
            throw new ProjectNotFoundException("Project not found");
        }

        s3Service.deleteProjectFolder(id);

        projectRepository.delete(optionalProject.get());

        return GenericResponseDTO.builder()
                .message("Project deleted successfully")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponseDTO addProject(CreateProjectRequestDTO request) {
        Optional<Project> optionalProject = projectRepository.findByNameIgnoreCaseAndAddressIgnoreCase(request.getName(), request.getAddress());

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
                .build();

        projectRepository.save(project);

        return GenericResponseDTO.builder()
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

    public GenericResponseDTO updateProject(Integer id, UpdateProjectRequestDTO request) {
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

        projectRepository.save(project);

        return GenericResponseDTO.builder()
                .message("Project updated successfully")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public List<ProjectCalendarDTO> getProjectsByMonth(Integer year, Integer month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.withDayOfMonth(startOfMonth.lengthOfMonth());
        List<Project> projectList = projectRepository.findUncompletedByStartDateBetween(startOfMonth, endOfMonth);
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

    public ProjectDTO toProjectDTO(Project project){
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
                .build();
    }

    public YearlyDrywallProjectsDTO getProjectsGraphData(){
        return YearlyDrywallProjectsDTO.builder()
                .januaryProjects(getCountByMonthHelper(1))
                .februaryProjects(getCountByMonthHelper(2))
                .marchProjects(getCountByMonthHelper(3))
                .aprilProjects(getCountByMonthHelper(4))
                .mayProjects(getCountByMonthHelper(5))
                .juneProjects(getCountByMonthHelper(6))
                .julyProjects(getCountByMonthHelper(7))
                .augustProjects(getCountByMonthHelper(8))
                .septemberProjects(getCountByMonthHelper(9))
                .octoberProjects(getCountByMonthHelper(10))
                .novemberProjects(getCountByMonthHelper(11))
                .decemberProjects(getCountByMonthHelper(12))
                .build();
    }

    private Integer getCountByMonthHelper(Integer month){
        LocalDate startOfMonth = LocalDate.of(LocalDate.now().getYear(), month, 1);
        LocalDate endOfMonth = startOfMonth.withDayOfMonth(startOfMonth.lengthOfMonth()).plusDays(1);
        return projectRepository.drywallProjectsThisMonth(startOfMonth, endOfMonth);
    }

    public ProjectDashboardDTO getProjectDashboardInfo() {
        return ProjectDashboardDTO.builder()
                .projectsThisWeek(projectsThisWeekHelper())
                .projectsLastWeek(projectsLastWeekHelper())
                .projectsCompletedThisMonth(projectsCompletedThisMonthHelper())
                .projectsCompletedLastMonth(projectsCompletedLastMonthHelper())
                .numberOfWorkers(totalUsersByRoleHelper())
                .mostRecentProject(mostRecentProjectHelper())
                .totalProjectsCompleted(projectsCompletedHelper())
                .totalProjectsUnCompleted(totalProjectsHelper())
                .projectsNextWeek(projectsNextWeekHelper())
                .build();
    }

    private Integer projectsCompletedLastMonthHelper() {
        LocalDate startOfLastMonth = LocalDate.now().withDayOfMonth(1).minusMonths(1);
        LocalDate endOfLastMonth = startOfLastMonth.plusMonths(1); // exclusive
        return projectRepository.countCompletedProjectsInMonth(startOfLastMonth, endOfLastMonth);
    }

    private Integer projectsLastWeekHelper(){
        LocalDate startOfLastWeek = LocalDate.now().with(DayOfWeek.MONDAY).minusWeeks(1);
        LocalDate endOfLastWeek = startOfLastWeek.plusWeeks(1);
        return projectRepository.totalProjectsByWeek(startOfLastWeek, endOfLastWeek);
    }

    private Integer projectsCompletedHelper(){
        return projectRepository.getCompletedProjects();
    }

    private Integer projectsNextWeekHelper(){
        LocalDate nextMonday = LocalDate.now().with(DayOfWeek.MONDAY).plusWeeks(1);
        LocalDate endOfNextWeek = nextMonday.plusWeeks(1); // the Monday after next
        return projectRepository.getProjectNextWeek(nextMonday, endOfNextWeek);
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

    private ProjectSummaryDTO mostRecentProjectHelper(){
        Optional<Project> optionalProject = projectRepository.findTopByOrderByIdDesc();

        if(optionalProject.isEmpty()){
            return ProjectSummaryDTO.builder()
                    .id(0)
                    .name("No Projects Yet")
                    .clientName("No Client Name")
                    .address("No Project Address")
                    .startDate(null)
                    .build();
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

    public List<ProjectDTO> getDashboardSearchedProject(ProjectSearchRequestDTO request) {
        String clientName = request.getClientName().isEmpty() ? null : request.getClientName();
        String projectAddress = request.getProjectAddress().isEmpty() ? null : request.getProjectAddress();
        String status = request.getStatus().isEmpty() ? null : request.getStatus();

        List<Project> projects = projectRepository.findDashboardProject(clientName, projectAddress, status);

        return projects.stream().map(this::toProjectDTO).toList();
    }
}
