package com.freelancer.freelancer_platform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancer.freelancer_platform.entity.Project;
import com.freelancer.freelancer_platform.entity.ProjectStatus;

public interface ProjectRepository extends JpaRepository<Project,Long> {

    List<Project> findByStatus(ProjectStatus projectStatus);

    List<Project> findBySkillsRequiredContainingIgnoreCase(String skill);

    List<Project> findByBudgetBetween(Double minBudget,Double maxBudget);

    List<Project> findByStatusAndSkillsRequiredContainingIgnoreCase(ProjectStatus projectStatus,String skill);

    List<Project> findByClientId(Long clientId);
}
