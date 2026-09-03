package com.freelancer.freelancer_platform.dto;

import com.freelancer.freelancer_platform.entity.TaskStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TaskRequest {
    
    @NotNull
    private Long projectId;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private Long assignedToId;

    private TaskStatus status;

    
    public Long getProjectId() {
        return projectId;
    }


    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }


    public String getTitle() {
        return title;
    }


    public void setTitle(String title) {
        this.title = title;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public Long getAssignedToId() {
        return assignedToId;
    }


    public void setAssignedToId(Long assignedToId) {
        this.assignedToId = assignedToId;
    }


    public TaskStatus getStatus() {
        return status;
    }


    public void setStatus(TaskStatus status) {
        this.status = status;
    }


    public TaskRequest() {
    }
}
