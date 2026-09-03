package com.freelancer.freelancer_platform.dto;

import java.util.List;

public class WorkspaceResponse {
    
    private Long projectId;
    private String projectTitle;
    private String projectDescription;
    private String projectStatus;

    private List<TaskResponse> tasks;
    private List<TeamMemberResponse> teamMembers;

    
    public WorkspaceResponse() {
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


    public String getProjectDescription() {
        return projectDescription;
    }


    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }


    public String getProjectStatus() {
        return projectStatus;
    }


    public void setProjectStatus(String projectStatus) {
        this.projectStatus = projectStatus;
    }


    public List<TaskResponse> getTasks() {
        return tasks;
    }


    public void setTasks(List<TaskResponse> tasks) {
        this.tasks = tasks;
    }


    public List<TeamMemberResponse> getTeamMembers() {
        return teamMembers;
    }


    public void setTeamMembers(List<TeamMemberResponse> teamMembers) {
        this.teamMembers = teamMembers;
    }
}
