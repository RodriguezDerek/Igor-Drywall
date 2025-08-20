package com.igordrywall.backend.repository;

import com.igordrywall.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Optional<Project> findByNameIgnoreCaseAndAddressIgnoreCase(String name, String address);
    Optional<Project> findTopByOrderByIdDesc();

    @Query("SELECT p FROM Project p WHERE p.startDate >= :start AND p.startDate <= :end AND p.projectStatus <> 'Completed'")
    List<Project> findUncompletedByStartDateBetween(@Param("start") LocalDate start, @Param("end") LocalDate end);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.startDate >= :startOfWeek AND p.startDate < :endOfWeek")
    int totalProjectsByWeek(@Param("startOfWeek") LocalDate startOfWeek, @Param("endOfWeek") LocalDate endOfWeek);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.projectStatus = 'Completed' AND p.startDate >= :startOfMonth AND p.startDate < :endOfMonth")
    int countCompletedProjectsInMonth(@Param("startOfMonth") LocalDate startOfMonth, @Param("endOfMonth") LocalDate endOfMonth);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.startDate >= :startOfMonth AND p.startDate < :endOfMonth")
    int drywallProjectsThisMonth(@Param("startOfMonth") LocalDate startOfMonth, @Param("endOfMonth") LocalDate endOfMonth);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.projectStatus = 'Upcoming' OR p.projectStatus = 'In-Progress'")
    int getTotalDrywallProjects();

    @Query("SELECT COUNT(p) FROM Project p WHERE p.startDate >= :startOfNextWeek AND p.startDate < :endOfWeek AND p.projectStatus <> 'Completed'")
    int getProjectNextWeek(@Param("startOfNextWeek") LocalDate startOfNextWeek, @Param("endOfWeek") LocalDate endOfWeek);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.projectStatus = 'Completed'")
    int getCompletedProjects();

    @Query("SELECT p FROM Project p WHERE (p.clientName = :clientName OR p.address = :projectAddress) AND p.projectStatus = :status")
    List<Project> findDashboardProject(@Param("clientName") String clientName, @Param("projectAddress") String projectAddress, @Param("status") String status);

}