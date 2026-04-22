package com.project.backend.project;

import com.project.backend.enums.ProjectStatus;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByTitle(String title);

    List<Project> findByProjectStatus(ProjectStatus status, Sort sort);
    List<Project> findTop4ByOrderByCreatedAtDesc();
    List<Project> findByStartDateBetween(LocalDateTime start, LocalDateTime end);

    long countByProjectStatus(ProjectStatus status);
}
