package com.igordrywall.backend.DTO.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectCalendarDTO {
    private String name;
    private String address;
    private String team;
    private LocalDate date;
}
