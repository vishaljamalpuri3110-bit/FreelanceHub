package com.freelancer.freelancer_platform.service;

import org.springframework.stereotype.Service;

import com.freelancer.freelancer_platform.entity.User;
import com.freelancer.freelancer_platform.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

}
