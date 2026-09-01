package com.freelancer.freelancer_platform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancer.freelancer_platform.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application,Long> {
    List<Application> findByProjectId(Long projectId);

    List<Application> findByFreelancerId(Long freelancerId);
    
}
