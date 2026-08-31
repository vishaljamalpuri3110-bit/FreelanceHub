package com.freelancer.freelancer_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancer.freelancer_platform.entity.Project;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    
}
