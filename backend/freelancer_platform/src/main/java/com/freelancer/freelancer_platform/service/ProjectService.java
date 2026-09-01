package com.freelancer.freelancer_platform.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.freelancer.freelancer_platform.dto.ProjectRequest;
import com.freelancer.freelancer_platform.dto.ProjectResponse;
import com.freelancer.freelancer_platform.entity.Project;
import com.freelancer.freelancer_platform.entity.ProjectStatus;
import com.freelancer.freelancer_platform.entity.User;
import com.freelancer.freelancer_platform.repository.ProjectRepository;
import com.freelancer.freelancer_platform.repository.UserRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository,
                          UserRepository userRepository) {

        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    
    public ProjectResponse createProject(ProjectRequest request) {

        User client = userRepository.findById(request.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Project project = new Project();

        project.setClient(client);
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setBudget(request.getBudget());
        project.setDeadline(request.getDeadline());
        project.setSkillsRequired(request.getSkillsRequired());

        
        project.setStatus(ProjectStatus.OPEN);

        Project saved = projectRepository.save(project);

        return convertToResponse(saved);
    }


    
    public List<ProjectResponse> getAllProjects() {

        return projectRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    
    public ProjectResponse getProjectById(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return convertToResponse(project);
    }


    
    public ProjectResponse updateProject(Long id, ProjectRequest request) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setBudget(request.getBudget());
        project.setDeadline(request.getDeadline());
        project.setSkillsRequired(request.getSkillsRequired());

        Project updated = projectRepository.save(project);

        return convertToResponse(updated);
    }


    public void deleteProject(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        projectRepository.delete(project);
    }


    private ProjectResponse convertToResponse(Project project) {

        ProjectResponse response = new ProjectResponse();

        response.setId(project.getId());

        response.setClientId(project.getClient().getId());
        response.setClientName(project.getClient().getName());

        response.setTitle(project.getTitle());
        response.setDescription(project.getDescription());
        response.setBudget(project.getBudget());
        response.setDeadline(project.getDeadline());
        response.setSkillsRequired(project.getSkillsRequired());
        response.setStatus(project.getStatus());

        response.setCreatedAt(project.getCreatedAt());
        response.setUpdatedAt(project.getUpdatedAt());

        return response;
    }

    public List<ProjectResponse> searchProjects(
        String skill,
        Double minBudget,
        Double maxBudget,
        ProjectStatus status) {

    List<Project> projects;

    if (skill != null && status != null) {

        projects = projectRepository
                .findByStatusAndSkillsRequiredContainingIgnoreCase(status, skill);

    } else if (skill != null) {

        projects = projectRepository
                .findBySkillsRequiredContainingIgnoreCase(skill);

    } else if (minBudget != null && maxBudget != null) {

        projects = projectRepository
                .findByBudgetBetween(minBudget, maxBudget);

    } else if (status != null) {

        projects = projectRepository
                .findByStatus(status);

    } else {

        projects = projectRepository.findAll();
    }

    return projects.stream()
            .map(this::convertToResponse)
            .toList();
    }

    public List<ProjectResponse> getProjectsByClient(Long clientId) {

    return projectRepository.findByClientId(clientId)
            .stream()
            .map(this::convertToResponse)
            .toList();
}

}