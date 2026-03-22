package com.project.backend.exceptions;

public class InvoiceNameExistsException extends RuntimeException {
    public InvoiceNameExistsException(String message) {
        super(message);
    }
}
