package com.igordrywall.backend.repository;

import com.igordrywall.backend.model.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ProjectRepositoryTest {

    @Autowired
    private ProjectRepository projectRepository;

    private Project createProject(String name, String address, LocalDate startDate, String status, int drywall) {
        return Project.builder()
                .name(name)
                .address(address)
                .startDate(startDate)
                .projectStatus(status)
                .team("Team A")
                .totalDrywall(drywall)
                .build();
    }

    @Test
    void testFindByNameIgnoreCaseAndAddressIgnoreCase() {
        Project project = createProject("Test Project", "123 Main St", LocalDate.now(), "Upcoming", 10);
        projectRepository.save(project);

        Optional<Project> result = projectRepository.findByNameIgnoreCaseAndAddressIgnoreCase("test project", "123 main st");

        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Test Project");
    }

    @Test
    void testFindByStartDateBetween() {
        LocalDate now = LocalDate.now();

        Project p1 = createProject("P1", "A", now.minusDays(5), "Upcoming", 10);
        Project p2 = createProject("P2", "B", now.plusDays(2), "Upcoming", 10);
        Project p3 = createProject("P3", "C", now.plusDays(10), "Upcoming", 10);

        projectRepository.saveAll(List.of(p1, p2, p3));

        List<Project> results = projectRepository.findByStartDateBetween(now.minusDays(7), now.plusDays(5));
        assertThat(results).hasSize(2);
    }

    @Test
    void testFindTopByOrderByIdDesc() {
        Project p1 = createProject("P1", "A", LocalDate.now(), "Upcoming", 10);
        Project p2 = createProject("P2", "B", LocalDate.now(), "Upcoming", 10);
        projectRepository.save(p1);
        projectRepository.save(p2);

        Optional<Project> result = projectRepository.findTopByOrderByIdDesc();

        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(p2.getId());
    }

    @Test
    void testTotalProjectsByWeek() {
        LocalDate startOfWeek = LocalDate.now().with(java.time.DayOfWeek.MONDAY);
        LocalDate endOfWeek = startOfWeek.plusDays(7);

        Project p1 = createProject("P1", "A", startOfWeek.plusDays(1), "Upcoming", 0);
        Project p2 = createProject("P2", "B", startOfWeek.minusDays(1), "Upcoming", 0);

        projectRepository.saveAll(List.of(p1, p2));

        int count = projectRepository.totalProjectsByWeek(startOfWeek, endOfWeek);
        assertThat(count).isEqualTo(1);
    }

    @Test
    void testCountCompletedProjectsInMonth() {
        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1);

        Project completed = createProject("Completed Project", "X", startOfMonth.plusDays(5), "Completed", 0);
        Project inProgress = createProject("In Progress", "Y", startOfMonth.plusDays(3), "In-Progress", 0);

        projectRepository.saveAll(List.of(completed, inProgress));

        int count = projectRepository.countCompletedProjectsInMonth(startOfMonth, endOfMonth);
        assertThat(count).isEqualTo(1);
    }

    @Test
    void testDrywallSheetsThisMonth() {
        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1);

        Project p1 = createProject("P1", "A", startOfMonth.plusDays(3), "Upcoming", 50);
        Project p2 = createProject("P2", "B", startOfMonth.plusDays(10), "Upcoming", 30);
        Project p3 = createProject("P3", "C", startOfMonth.minusMonths(1), "Upcoming", 100);

        projectRepository.saveAll(List.of(p1, p2, p3));

        int total = projectRepository.drywallSheetsThisMonth(startOfMonth, endOfMonth);
        assertThat(total).isEqualTo(80);
    }

    @Test
    void testDrywallProjectsThisMonth() {
        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1);

        Project p1 = createProject("P1", "A", startOfMonth.plusDays(2), "Upcoming", 0);
        Project p2 = createProject("P2", "B", startOfMonth.plusDays(15), "Upcoming", 0);
        Project p3 = createProject("P3", "C", startOfMonth.minusMonths(1), "Upcoming", 0);

        projectRepository.saveAll(List.of(p1, p2, p3));

        int count = projectRepository.drywallProjectsThisMonth(startOfMonth, endOfMonth);
        assertThat(count).isEqualTo(2);
    }

    @Test
    void testGetTotalDrywallProjects() {
        Project p1 = createProject("P1", "A", LocalDate.now(), "Upcoming", 0);
        Project p2 = createProject("P2", "B", LocalDate.now(), "In-Progress", 0);
        Project p3 = createProject("P3", "C", LocalDate.now(), "Completed", 0);

        projectRepository.saveAll(List.of(p1, p2, p3));

        int count = projectRepository.getTotalDrywallProjects();
        assertThat(count).isEqualTo(2);
    }
}
