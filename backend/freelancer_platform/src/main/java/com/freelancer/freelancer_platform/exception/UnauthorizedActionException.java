package com.freelancer.freelancer_platform.exception;

public class UnauthorizedActionException extends RuntimeException{
    public UnauthorizedActionException(String message) {
        super(message);
    }
}
