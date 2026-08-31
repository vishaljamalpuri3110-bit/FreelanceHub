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

    // CREATE
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

        // New projects are OPEN by default
        project.setStatus(ProjectStatus.OPEN);

        Project saved = projectRepository.save(project);

        return convertToResponse(saved);
    }


    // GET ALL
    public List<ProjectResponse> getAllProjects() {

        return projectRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // GET BY ID
    public ProjectResponse getProjectById(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return convertToResponse(project);
    }


    // UPDATE
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


    // DELETE
    public void deleteProject(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        projectRepository.delete(project);
    }


    // ENTITY → RESPONSE
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
}