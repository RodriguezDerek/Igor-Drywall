package com.project.backend.DTO.quote;

import com.project.backend.enums.ServiceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuoteTableDTO {
    private Long id;
    private String clientName;
    private String email;
    private String phoneNumber;
    private ServiceType service;
    private String budget;
    private LocalDateTime creationDate;
}
