package com.freelancer.freelancer_platform.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Profile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String profilePhoto;
    private String location;
    private String skills;
    private String experienceLevel;
    private String education;
    private String portfolio;
    private Double hourlyRate;
    private String availability;
    private String bio;

    private String companyName;
    private String industry;
    private String companyDescription;
    private String previousProjects;
    private String contactInformation;
    

    
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
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
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public String getProfilePhoto() {
        return profilePhoto;
    }
    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }
    public String getSkills() {
        return skills;
    }
    public void setSkills(String skills) {
        this.skills = skills;
    }
    
    
    public String getEducation() {
        return education;
    }
    public void setEducation(String education) {
        this.education = education;
    }
    public String getPortfolio() {
        return portfolio;
    }
    public void setPortfolio(String portfolio) {
        this.portfolio = portfolio;
    }
    public Double getHourlyRate() {
        return hourlyRate;
    }
    public void setHourlyRate(Double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }
    public String getAvailability() {
        return availability;
    }
    public void setAvailability(String availability) {
        this.availability = availability;
    }
    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    
    public String getPreviousProjects() {
        return previousProjects;
    }
    public void setPreviousProjects(String previousProjects) {
        this.previousProjects = previousProjects;
    }
    public String getContactInformation() {
        return contactInformation;
    }
    public void setContactInformation(String contactInformation) {
        this.contactInformation = contactInformation;
    }
    public Profile() {
    }

    
}
