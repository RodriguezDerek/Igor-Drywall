package com.project.backend.exceptions;

public class DetailsUnchangedException extends RuntimeException {
    public DetailsUnchangedException(String message) {
        super(message);
    }
}
