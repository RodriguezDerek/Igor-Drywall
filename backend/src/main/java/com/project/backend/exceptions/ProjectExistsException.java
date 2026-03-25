package com.project.backend.exceptions;

public class ProjectExistsException extends RuntimeException {
    public ProjectExistsException(String message) {
        super(message);
    }
}
