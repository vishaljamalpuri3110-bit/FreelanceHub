package com.freelancer.freelancer_platform.service;

import org.springframework.stereotype.Service;

import com.freelancer.freelancer_platform.dto.WorkspaceResponse;
import com.freelancer.freelancer_platform.entity.Project;
import com.freelancer.freelancer_platform.repository.ProjectRepository;

@Service
public class WorkspaceService {

    private final ProjectRepository projectRepository;
    private final TaskService taskService;
    private final ApplicationService applicationService;

    public WorkspaceService(
            ProjectRepository projectRepository,
            TaskService taskService,
            ApplicationService applicationService) {

        this.projectRepository = projectRepository;
        this.taskService = taskService;
        this.applicationService = applicationService;
    }

    public WorkspaceResponse getWorkspace(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        WorkspaceResponse response = new WorkspaceResponse();

        response.setProjectId(project.getId());
        response.setProjectTitle(project.getTitle());
        response.setProjectDescription(project.getDescription());
        response.setProjectStatus(project.getStatus().name());

        response.setTasks(
                taskService.getTasksByProject(projectId)
        );

        response.setTeamMembers(
                applicationService.getTeamMembers(projectId)
        );

        return response;
    }
}