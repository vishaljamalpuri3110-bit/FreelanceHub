package com.freelancer.freelancer_platform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ApplicationRequest {
    
    @NotNull
    private Long projectId;

    @NotNull
    private Long freelancerId;

    @NotBlank
    private String coverLetter;

    @NotNull
    @Positive
    private Double proposedBudget;

    
    public Long getProjectId() {
        return projectId;
    }


    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }


    public Long getFreelancerId() {
        return freelancerId;
    }


    public void setFreelancerId(Long freelancerId) {
        this.freelancerId = freelancerId;
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


    public ApplicationRequest() {
    }
}
