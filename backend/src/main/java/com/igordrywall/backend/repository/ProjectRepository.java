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
    List<Project> findByStartDateBetween(LocalDate start, LocalDate end);
    Optional<Project> findTopByOrderByIdDesc();

    @Query("SELECT COUNT(p) FROM Project p WHERE p.startDate >= :startOfWeek AND p.startDate < :endOfWeek")
    int totalProjectsByWeek(@Param("startOfWeek") LocalDate startOfWeek, @Param("endOfWeek") LocalDate endOfWeek);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.projectStatus = 'Completed' AND p.startDate >= :startOfMonth AND p.startDate < :endOfMonth")
    int countCompletedProjectsInMonth(@Param("startOfMonth") LocalDate startOfMonth, @Param("endOfMonth") LocalDate endOfMonth);

    @Query("SELECT COALESCE(SUM(p.totalDrywall), 0) FROM Project p WHERE p.startDate >= :startOfMonth AND p.startDate < :endOfMonth")
    int drywallSheetsThisMonth(@Param("startOfMonth") LocalDate startOfMonth, @Param("endOfMonth") LocalDate endOfMonth);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.startDate >= :startOfMonth AND p.startDate < :endOfMonth")
    int drywallProjectsThisMonth(@Param("startOfMonth") LocalDate startOfMonth, @Param("endOfMonth") LocalDate endOfMonth);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.projectStatus = 'Upcoming' OR p.projectStatus = 'In-Progress'")
    int getTotalDrywallProjects();
}