package com.igordrywall.backend.DTO.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GenericResponseDTO {
    private String message;
    private int status;
    private LocalDateTime timeStamp;
}