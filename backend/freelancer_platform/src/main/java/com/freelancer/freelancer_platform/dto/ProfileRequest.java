package com.freelancer.freelancer_platform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class ProfileRequest {
    
    private Long userId;
    
    @NotBlank
    private String location;
    
    private String skills;
    
    @Positive
    private Double hourlyRate;
    
    private String experienceLevel;
    
    private String bio;
    
    private String companyName;
    
    private String industry;
    
    private String companyDescription;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public Double getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(Double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public String getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }

    public ProfileRequest() {
    }

    
}
