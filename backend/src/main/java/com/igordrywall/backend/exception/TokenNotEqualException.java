package com.igordrywall.backend.exception;

public class TokenNotEqualException extends RuntimeException {
    public TokenNotEqualException(String message) {
        super(message);
    }
}
