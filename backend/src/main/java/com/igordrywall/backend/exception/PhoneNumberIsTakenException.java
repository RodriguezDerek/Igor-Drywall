package com.igordrywall.backend.exception;

public class PhoneNumberIsTakenException extends RuntimeException {
    public PhoneNumberIsTakenException(String message) {
        super(message);
    }
}
