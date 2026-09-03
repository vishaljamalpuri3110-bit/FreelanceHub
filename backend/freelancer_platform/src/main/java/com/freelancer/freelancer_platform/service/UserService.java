package com.freelancer.freelancer_platform.service;

import org.springframework.stereotype.Service;

import com.freelancer.freelancer_platform.dto.UserRequest;
import com.freelancer.freelancer_platform.dto.UserResponse;
import com.freelancer.freelancer_platform.entity.User;
import com.freelancer.freelancer_platform.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.passwordEncoder=passwordEncoder;
        this.userRepository=userRepository;
    }

    public UserResponse saveUser( UserRequest request) {
        User user = convertToEntity(request);
        User saved = userRepository.save(user);
        return convertToResponse(saved);
    }

    private User convertToEntity(UserRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        return user;
    }

    private UserResponse convertToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        return response;
    }

    public UserResponse getCurrentUser() {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    return convertToResponse(user);
}
}
