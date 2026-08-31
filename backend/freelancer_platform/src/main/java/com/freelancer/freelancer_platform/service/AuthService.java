package com.freelancer.freelancer_platform.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.freelancer.freelancer_platform.config.JwtService;
import com.freelancer.freelancer_platform.dto.LoginRequest;
import com.freelancer.freelancer_platform.dto.LoginResponse;
import com.freelancer.freelancer_platform.entity.User;
import com.freelancer.freelancer_platform.exception.InvalidCredentialsException;
import com.freelancer.freelancer_platform.repository.UserRepository;

@Service
public class AuthService {
    private UserRepository userRepository;
    private JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,JwtService jwtService,PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.jwtService=jwtService;
        this.passwordEncoder=passwordEncoder;
    }

    public LoginResponse login(LoginRequest request){
        User user=userRepository.findByEmail(request.getEmail())
                  .orElseThrow(()->new InvalidCredentialsException("Invalid email or password"));

        if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw new InvalidCredentialsException("Invalid email and password");
        }

        String token=jwtService.generateToken(user);

        LoginResponse response=new LoginResponse();
        response.setToken(token);
        return response;

    }
}
