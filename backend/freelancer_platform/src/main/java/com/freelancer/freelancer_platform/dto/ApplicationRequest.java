package com.freelancer.freelancer_platform.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ApplicationRequest {

    @NotNull
    private Long projectId;

    private String projectTitle;

    private Long freelancerId;

    private String freelancerName;

    private Long clientId;

    private String clientName;

    @NotNull
    @Positive
    private Double budget;

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

    public Long getFreelancerId() {
        return freelancerId;
    }

    public void setFreelancerId(Long freelancerId) {
        this.freelancerId = freelancerId;
    }

    public String getFreelancerName() {
        return freelancerName;
    }

    public void setFreelancerName(String freelancerName) {
        this.freelancerName = freelancerName;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public ApplicationRequest() {
    }


}
