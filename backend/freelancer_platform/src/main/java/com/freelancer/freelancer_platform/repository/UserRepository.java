package com.freelancer.freelancer_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancer.freelancer_platform.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
    
}
