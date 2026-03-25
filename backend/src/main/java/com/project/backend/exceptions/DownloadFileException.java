package com.project.backend.exceptions;

public class DownloadFileException extends RuntimeException {
    public DownloadFileException(String message) {
        super(message);
    }
}
