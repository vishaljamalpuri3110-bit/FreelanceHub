package com.freelancer.freelancer_platform.dto;

import java.time.Instant;

import com.freelancer.freelancer_platform.entity.ApplicationStatus;

public class ApplicationResponse {
    
    private Long id;

    private Long projectId;
    private String projectTitle;

    private Long freelancerId;
    private String freelancerName;

    private String coverLetter;
    private Double proposedBudget;

    private ApplicationStatus status;

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




    public String getCoverLetter() {
        return coverLetter;
    }




    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }




    public Double getProposedBudget() {
        return proposedBudget;
    }




    public void setProposedBudget(Double proposedBudget) {
        this.proposedBudget = proposedBudget;
    }




    public ApplicationStatus getStatus() {
        return status;
    }




    public void setStatus(ApplicationStatus status) {
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




    public ApplicationResponse() {
    }
}
