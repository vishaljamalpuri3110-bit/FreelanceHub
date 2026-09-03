package com.freelancer.freelancer_platform.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.freelancer_platform.dto.UserRequest;
import com.freelancer.freelancer_platform.dto.UserResponse;
import com.freelancer.freelancer_platform.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }

    @PostMapping
    public UserResponse createUser(@Valid @RequestBody UserRequest request) {
        return userService.saveUser(request);
    }

    @GetMapping("/me")
public UserResponse getCurrentUser() {
    return userService.getCurrentUser();
}

}
