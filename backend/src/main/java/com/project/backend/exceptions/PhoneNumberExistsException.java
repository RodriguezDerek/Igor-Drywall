package com.project.backend.exceptions;

public class PhoneNumberExistsException extends RuntimeException {
    public PhoneNumberExistsException(String message) {
        super(message);
    }
}
