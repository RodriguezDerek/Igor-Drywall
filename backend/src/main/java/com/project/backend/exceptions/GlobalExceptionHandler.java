package com.project.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleValidationException(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());

        return ErrorMessage.builder()
                .message(String.join("; ", errors))
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(EmailExistsException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handleEmailExistsException(EmailExistsException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.CONFLICT.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(PhoneNumberExistsException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handlePhoneNumberExistsException(PhoneNumberExistsException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.CONFLICT.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleUserNotFoundException(UserNotFoundException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.NOT_FOUND.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(UserNotEnabledException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleUserNotEnabledException(UserNotEnabledException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(DetailsUnchangedException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handleUserDetailsUnchangedException(DetailsUnchangedException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.CONFLICT.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(InvalidCurrentPasswordException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleInvalidCurrentPasswordException(InvalidCurrentPasswordException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(QuoteNotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleQuoteNotFoundException(QuoteNotFoundException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.NOT_FOUND.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(InvoiceNameExistsException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handleInvoiceNameExistsException(InvoiceNameExistsException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.CONFLICT.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(InvoiceNotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleInvoiceNotFoundException(InvoiceNotFoundException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.NOT_FOUND.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(ProjectExistsException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handleProjectExistsException(ProjectExistsException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.CONFLICT.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(DownloadFileException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handleDownloadFileException(DownloadFileException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.CONFLICT.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(ProjectNotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleProjectNotFoundException(ProjectNotFoundException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.NOT_FOUND.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(MaterialSheetNotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleMaterialSheetNotFoundException(MaterialSheetNotFoundException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.NOT_FOUND.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(InvoiceItemNotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleInvoiceItemNotFoundException(InvoiceItemNotFoundException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.NOT_FOUND.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(MaterialTypeNotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleMaterialTypeNotFoundException(MaterialTypeNotFoundException ex) {
        return ErrorMessage.builder()
                .message(ex.getMessage())
                .statusCode(HttpStatus.NOT_FOUND.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(org.springframework.security.core.AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorMessage handleAuthenticationException(Exception ex) {
        return ErrorMessage.builder()
                .message("Invalid email or password")
                .statusCode(HttpStatus.UNAUTHORIZED.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorMessage handleGenericException(Exception ex) {
        return ErrorMessage.builder()
                .message("Something went wrong. Please try again.")
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public ErrorMessage handleAccessDenied(Exception ex) {
        return ErrorMessage.builder()
                .message("You are not authorized to access this resource")
                .statusCode(HttpStatus.FORBIDDEN.value())
                .localDateTime(LocalDateTime.now())
                .build();
    }
}