package com.project.backend.exceptions;

public class UserDetailsUnchangedException extends RuntimeException {
    public UserDetailsUnchangedException(String message) {
        super(message);
    }
}
