package com.igordrywall.backend.DTO.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class YearlyDrywallProjectsDTO {
    Integer januaryProjects;
    Integer februaryProjects;
    Integer marchProjects;
    Integer aprilProjects;
    Integer mayProjects;
    Integer juneProjects;
    Integer julyProjects;
    Integer augustProjects;
    Integer septemberProjects;
    Integer octoberProjects;
    Integer novemberProjects;
    Integer decemberProjects;
}
