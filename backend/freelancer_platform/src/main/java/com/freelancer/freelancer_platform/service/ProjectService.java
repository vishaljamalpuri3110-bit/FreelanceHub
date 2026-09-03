package com.freelancer.freelancer_platform.service;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.freelancer.freelancer_platform.dto.ProjectRequest;
import com.freelancer.freelancer_platform.dto.ProjectResponse;
import com.freelancer.freelancer_platform.entity.Project;
import com.freelancer.freelancer_platform.entity.ProjectStatus;
import com.freelancer.freelancer_platform.entity.User;
import com.freelancer.freelancer_platform.exception.UnauthorizedActionException;
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

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    User client = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Project project = new Project();

    project.setClient(client);
    project.setTitle(request.getTitle());
    project.setDescription(request.getDescription());
    project.setBudget(request.getBudget());
    project.setDeadline(request.getDeadline());
    project.setSkillsRequired(request.getSkillsRequired());
    project.setCategory(request.getCategory());
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

    User user = getAuthenticatedUser();

    if (!project.getClient().getId().equals(user.getId())) {
        throw new UnauthorizedActionException(
        "You are not allowed to update this project");
    }

    project.setTitle(request.getTitle());
    project.setDescription(request.getDescription());
    project.setBudget(request.getBudget());
    project.setDeadline(request.getDeadline());
    project.setSkillsRequired(request.getSkillsRequired());
    project.setCategory(request.getCategory());

    Project updated = projectRepository.save(project);

    return convertToResponse(updated);
}


    public void deleteProject(Long id) {

    Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found"));

    User user = getAuthenticatedUser();

    if (!project.getClient().getId().equals(user.getId())) {
        throw new UnauthorizedActionException(
        "You are not allowed to delete this project");
    }

    projectRepository.delete(project);
}

    private User getAuthenticatedUser() {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
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
        response.setCategory(project.getCategory());
        response.setStatus(project.getStatus());

        response.setCreatedAt(project.getCreatedAt());
        response.setUpdatedAt(project.getUpdatedAt());

        return response;
    }

    public List<ProjectResponse> searchProjects(
        String keyword,
        String category,
        String skill,
        Double minBudget,
        Double maxBudget,
        ProjectStatus status) {

    return projectRepository.findAll()
            .stream()

            // Keyword → title OR description
            .filter(project ->
                    keyword == null ||
                    project.getTitle().toLowerCase().contains(keyword.toLowerCase()) ||
                    project.getDescription().toLowerCase().contains(keyword.toLowerCase())
            )

            // Category
            .filter(project ->
                    category == null ||
                    (project.getCategory() != null &&
                     project.getCategory().equalsIgnoreCase(category))
            )

            // Skill
            .filter(project ->
                    skill == null ||
                    (project.getSkillsRequired() != null &&
                     project.getSkillsRequired()
                            .toLowerCase()
                            .contains(skill.toLowerCase()))
            )

            // Minimum budget
            .filter(project ->
                    minBudget == null ||
                    project.getBudget() >= minBudget
            )

            // Maximum budget
            .filter(project ->
                    maxBudget == null ||
                    project.getBudget() <= maxBudget
            )

            // Status
            .filter(project ->
                    status == null ||
                    project.getStatus() == status
            )

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
