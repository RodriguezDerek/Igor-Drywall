package com.igordrywall.backend.service;

import com.igordrywall.backend.DTO.common.GenericResponseDTO;
import com.igordrywall.backend.DTO.project.*;
import com.igordrywall.backend.exception.ProjectAlreadyExistsException;
import com.igordrywall.backend.exception.ProjectNotFoundException;
import com.igordrywall.backend.model.Project;
import com.igordrywall.backend.repository.ProjectRepository;
import com.igordrywall.backend.repository.UserRepository;
import com.igordrywall.backend.role.Role;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProjectService projectService;

    @Test
    void testAddProjectSuccess() {
        CreateProjectRequestDTO request = CreateProjectRequestDTO.builder()
                .name("Test Project")
                .address("123 Main St")
                .startDate(LocalDate.now())
                .projectStatus("Pending")
                .team("Team A")
                .build();

        when(projectRepository.findByNameIgnoreCaseAndAddressIgnoreCase("Test Project", "123 Main St"))
                .thenReturn(Optional.empty());

        GenericResponseDTO response = projectService.addProject(request);

        assertEquals("Project created successfully", response.getMessage());
        assertEquals(HttpStatus.CREATED.value(), response.getStatus());
        verify(projectRepository, times(1)).save(any(Project.class));
    }

    @Test
    void testAddProjectAlreadyExists() {
        CreateProjectRequestDTO request = CreateProjectRequestDTO.builder()
                .name("Duplicate")
                .address("456")
                .startDate(LocalDate.now())
                .projectStatus("In Progress")
                .team("Team B")
                .build();

        when(projectRepository.findByNameIgnoreCaseAndAddressIgnoreCase(anyString(), anyString()))
                .thenReturn(Optional.of(new Project()));

        assertThrows(ProjectAlreadyExistsException.class, () -> projectService.addProject(request));
    }

    @Test
    void testDeleteProjectSuccess() {
        Project project = new Project();
        project.setId(1);

        when(projectRepository.findById(1)).thenReturn(Optional.of(project));

        GenericResponseDTO response = projectService.deleteProject(1);
        assertEquals("Project deleted successfully", response.getMessage());
        verify(projectRepository).delete(project);
    }

    @Test
    void testDeleteProjectNotFound() {
        when(projectRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(ProjectNotFoundException.class, () -> projectService.deleteProject(1));
    }

    @Test
    void testGetProjectSuccess() {
        Project project = Project.builder()
                .id(1)
                .name("Alpha")
                .clientName("John")
                .clientPhoneNumber("123")
                .contractorName("ACME")
                .contractorPhoneNumber("456")
                .address("Loc")
                .description("Desc")
                .startDate(LocalDate.now())
                .projectStatus("Status")
                .team("Team")
                .build();

        when(projectRepository.findById(1)).thenReturn(Optional.of(project));

        ProjectDTO dto = projectService.getProject(1);
        assertEquals("Alpha", dto.getName());
        assertEquals("John", dto.getClientName());
    }

    @Test
    void testGetProjectNotFound() {
        when(projectRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(ProjectNotFoundException.class, () -> projectService.getProject(1));
    }

    @Test
    void testUpdateProjectSuccess() {
        Project project = Project.builder().id(1).name("Old").build();
        UpdateProjectRequestDTO request = UpdateProjectRequestDTO.builder()
                .name("New")
                .clientName("New Client")
                .clientPhoneNumber("123")
                .contractorName("New Contractor")
                .contractorPhoneNumber("456")
                .startDate(LocalDate.now())
                .projectStatus("Done")
                .team("Team X")
                .address("Address X")
                .description("Updated")
                .build();

        when(projectRepository.findById(1)).thenReturn(Optional.of(project));

        GenericResponseDTO response = projectService.updateProject(1, request);

        assertEquals("Project updated successfully", response.getMessage());
        verify(projectRepository).save(any(Project.class));
    }

    @Test
    void testUpdateProjectNotFound() {
        when(projectRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(ProjectNotFoundException.class, () -> projectService.updateProject(1, new UpdateProjectRequestDTO()));
    }

    @Test
    void testGetProjectsByMonth() {
        LocalDate date = LocalDate.of(2024, 5, 15);
        Project project = Project.builder()
                .name("May Project")
                .startDate(date)
                .team("Team M")
                .address("Somewhere")
                .build();

        when(projectRepository.findByStartDateBetween(any(), any())).thenReturn(List.of(project));

        List<ProjectCalendarDTO> list = projectService.getProjectsByMonth(2024, 5);
        assertEquals(1, list.size());
        assertEquals("May Project", list.get(0).getName());
    }

    @Test
    void testGetProjectsGraphData() {
        when(projectRepository.drywallProjectsThisMonth(any(), any())).thenReturn(3);

        YearlyDrywallProjectsDTO dto = projectService.getProjectsGraphData(2024);
        assertEquals(3, dto.getJanuaryProjects());
        assertEquals(3, dto.getDecemberProjects());
    }

    @Test
    void testGetDashboardInfo() {
        when(projectRepository.totalProjectsByWeek(any(), any())).thenReturn(5);
        when(projectRepository.countCompletedProjectsInMonth(any(), any())).thenReturn(2);
        when(userRepository.totalUsersByRole(Role.WORKER)).thenReturn(10);
        when(projectRepository.findTopByOrderByIdDesc()).thenReturn(Optional.of(Project.builder()
                .id(1)
                .name("Latest")
                .address("A")
                .clientName("C")
                .startDate(LocalDate.now())
                .build()));
        when(projectRepository.getTotalDrywallProjects()).thenReturn(25);

        ProjectDashboardDTO dashboard = projectService.getProjectDashboardInfo();
        assertEquals(5, dashboard.getProjectsThisWeek());
        assertEquals("Latest", dashboard.getMostRecentProject().getName());
        assertEquals(25, dashboard.getTotalProjects());
    }
}
