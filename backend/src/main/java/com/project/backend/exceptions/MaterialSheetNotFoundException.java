package com.project.backend.exceptions;

public class MaterialSheetNotFoundException extends RuntimeException {
    public MaterialSheetNotFoundException(String message) {
        super(message);
    }
}
