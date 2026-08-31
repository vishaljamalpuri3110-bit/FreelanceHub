package com.freelancer.freelancer_platform.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.HttpStatus;


@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<String> handleInvalidException(InvalidCredentialsException ex){
        return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(ex.getMessage());
    }
}
