package com.project.backend.exceptions;

public class MaterialTypeNotFoundException extends RuntimeException {
    public MaterialTypeNotFoundException(String message) {
        super(message);
    }
}
