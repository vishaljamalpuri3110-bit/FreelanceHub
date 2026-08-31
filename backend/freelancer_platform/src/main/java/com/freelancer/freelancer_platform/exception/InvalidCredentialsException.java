package com.freelancer.freelancer_platform.exception;

public class InvalidCredentialsException  extends RuntimeException{
    public InvalidCredentialsException(String message){
        super(message);
    }
}
