package com.project.backend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class ErrorMessage {
    private String message;
    private int statusCode;
    private LocalDateTime localDateTime;
}
