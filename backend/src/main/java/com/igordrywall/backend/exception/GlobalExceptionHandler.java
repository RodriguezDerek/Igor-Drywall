package com.igordrywall.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleValidationException(MethodArgumentNotValidException exception){
        return ErrorMessage.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST.value())
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleEmailAlreadyExistsException(EmailAlreadyExistsException exception){
        return ErrorMessage.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST.value())
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleUserNotFoundException(UserNotFoundException exception){
        return ErrorMessage.builder()
                .message(exception.getMessage())
                .status(HttpStatus.NOT_FOUND.value())
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(InvalidLoginException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleInvalidLoginException(InvalidLoginException exception){
        return ErrorMessage.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST.value())
                .timestamp(LocalDateTime.now())
                .build();
    }
}
