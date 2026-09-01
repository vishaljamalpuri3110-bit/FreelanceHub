package com.freelancer.freelancer_platform.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancer.freelancer_platform.entity.Application;
import com.freelancer.freelancer_platform.entity.ApplicationStatus;

public interface ApplicationRepository extends JpaRepository<Application,Long> {
    List<Application> findByProjectId(Long projectId);

    List<Application> findByFreelancerId(Long freelancerId);

    List<Application> findByProjectIdAndStatus(
        Long projectId,
        ApplicationStatus status
);
    Optional<Application> findByProjectIdAndFreelancerId(
        Long projectId,
        Long freelancerId
);
    
}
