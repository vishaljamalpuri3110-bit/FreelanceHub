package com.freelancer.freelancer_platform.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.freelancer.freelancer_platform.dto.TaskRequest;
import com.freelancer.freelancer_platform.dto.TaskResponse;
import com.freelancer.freelancer_platform.entity.Project;
import com.freelancer.freelancer_platform.entity.Task;
import com.freelancer.freelancer_platform.entity.TaskStatus;
import com.freelancer.freelancer_platform.entity.User;
import com.freelancer.freelancer_platform.repository.ProjectRepository;
import com.freelancer.freelancer_platform.repository.TaskRepository;
import com.freelancer.freelancer_platform.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public TaskService(
            TaskRepository taskRepository,
            ProjectRepository projectRepository,
            UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public TaskResponse createTask(TaskRequest request) {

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Task task = new Task();

        task.setProject(project);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());

        if (request.getAssignedToId() != null) {

            User user = userRepository.findById(request.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            task.setAssignedTo(user);
        }

        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        } else {
            task.setStatus(TaskStatus.TODO);
        }

        Task saved = taskRepository.save(task);

        return convertToResponse(saved);
    }

    // GET ALL TASKS OF PROJECT
    public List<TaskResponse> getTasksByProject(Long projectId) {

        return taskRepository.findByProjectId(projectId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // GET BY ID
    public TaskResponse getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        return convertToResponse(task);
    }

    public TaskResponse updateTask(Long id, TaskRequest request) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());

        if (request.getAssignedToId() != null) {

            User user = userRepository.findById(request.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            task.setAssignedTo(user);
        }

        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }

        Task updated = taskRepository.save(task);

        return convertToResponse(updated);
    }

    // CHANGE STATUS — FOR KANBAN
    public TaskResponse updateTaskStatus(Long id, TaskStatus status) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);

        Task updated = taskRepository.save(task);

        return convertToResponse(updated);
    }

    public void deleteTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        taskRepository.delete(task);
    }

    private TaskResponse convertToResponse(Task task) {

        TaskResponse response = new TaskResponse();

        response.setId(task.getId());

        response.setProjectId(task.getProject().getId());
        response.setProjectTitle(task.getProject().getTitle());

        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());

        if (task.getAssignedTo() != null) {
            response.setAssignedToId(task.getAssignedTo().getId());
            response.setAssignedToName(task.getAssignedTo().getName());
        }

        response.setStatus(task.getStatus());

        response.setCreatedAt(task.getCreatedAt());
        response.setUpdatedAt(task.getUpdatedAt());

        return response;
    }
}