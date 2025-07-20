package com.igordrywall.backend.exception;

public class EmailMessageErrorException extends RuntimeException {
    public EmailMessageErrorException(String message) {
        super(message);
    }
}
