package com.project.backend.exceptions;

public class InvoiceItemNotFoundException extends RuntimeException {
    public InvoiceItemNotFoundException(String message) {
        super(message);
    }
}
