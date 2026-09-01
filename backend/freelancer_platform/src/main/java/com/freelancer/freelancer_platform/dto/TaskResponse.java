package com.freelancer.freelancer_platform.dto;

import java.time.Instant;

import com.freelancer.freelancer_platform.entity.TaskStatus;

public class TaskResponse {
    
    private Long id;

    private Long projectId;
    private String projectTitle;

    private String title;
    private String description;

    private Long assignedToId;
    private String assignedToName;

    private TaskStatus status;

    private Instant createdAt;
    private Instant updatedAt;

    
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public Long getProjectId() {
        return projectId;
    }


    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }


    public String getProjectTitle() {
        return projectTitle;
    }


    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
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


    public String getAssignedToName() {
        return assignedToName;
    }


    public void setAssignedToName(String assignedToName) {
        this.assignedToName = assignedToName;
    }


    public TaskStatus getStatus() {
        return status;
    }


    public void setStatus(TaskStatus status) {
        this.status = status;
    }


    public Instant getCreatedAt() {
        return createdAt;
    }


    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }


    public Instant getUpdatedAt() {
        return updatedAt;
    }


    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }


    public TaskResponse() {
    }
}
