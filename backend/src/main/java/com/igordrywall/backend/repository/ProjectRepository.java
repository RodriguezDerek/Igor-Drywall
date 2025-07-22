package com.igordrywall.backend.repository;

import com.igordrywall.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Optional<Project> findByNameIgnoreCaseAndAddressIgnoreCase(String name, String address);
}