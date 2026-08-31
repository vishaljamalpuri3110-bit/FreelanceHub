package com.freelancer.freelancer_platform.service;

import org.springframework.stereotype.Service;

import com.freelancer.freelancer_platform.dto.ProfileRequest;
import com.freelancer.freelancer_platform.dto.ProfileResponse;
import com.freelancer.freelancer_platform.entity.Profile;
import com.freelancer.freelancer_platform.entity.User;
import com.freelancer.freelancer_platform.repository.ProfileRepository;
import com.freelancer.freelancer_platform.repository.UserRepository;

@Service
public class ProfileService {
    private ProfileRepository profileRepository;
    private UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository,UserRepository userRepository){
        this.profileRepository=profileRepository;
        this.userRepository=userRepository;
    }

    public ProfileResponse getProfileByUserId(Long userId) {

    Profile profile = profileRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

    return convertToResponse(profile);
}

    public ProfileResponse createProfile(ProfileRequest request) {
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        Profile profile = new Profile();
        profile.setUser(user);
        profile.setLocation(request.getLocation());
        profile.setSkills(request.getSkills());
        profile.setHourlyRate(request.getHourlyRate());
        profile.setExperienceLevel(request.getExperienceLevel());
        profile.setBio(request.getBio());
        profile.setCompanyName(request.getCompanyName());
        profile.setIndustry(request.getIndustry());
        profile.setCompanyDescription(request.getCompanyDescription());
        
        Profile saved = profileRepository.save(profile);
        return convertToResponse(saved);
    }

    private ProfileResponse convertToResponse(Profile profile) {

    ProfileResponse response = new ProfileResponse();

    response.setId(profile.getId());
    response.setUserId(profile.getUser().getId());

    response.setName(profile.getUser().getName());
    response.setEmail(profile.getUser().getEmail());
    response.setRole(profile.getUser().getRole().name());

    response.setProfilePhoto(profile.getProfilePhoto());
    response.setLocation(profile.getLocation());
    response.setSkills(profile.getSkills());
    response.setExperienceLevel(profile.getExperienceLevel());
    response.setEducation(profile.getEducation());
    response.setPortfolio(profile.getPortfolio());
    response.setHourlyRate(profile.getHourlyRate());
    response.setAvailability(profile.getAvailability());
    response.setBio(profile.getBio());

    response.setCompanyName(profile.getCompanyName());
    response.setIndustry(profile.getIndustry());
    response.setCompanyDescription(profile.getCompanyDescription());
    response.setPreviousProjects(profile.getPreviousProjects());
    response.setContactInformation(profile.getContactInformation());

    return response;
    }

    public ProfileResponse updateProfile(Long userId, ProfileRequest request) {

    Profile profile = profileRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

    profile.setLocation(request.getLocation());
    profile.setSkills(request.getSkills());
    profile.setHourlyRate(request.getHourlyRate());
    profile.setExperienceLevel(request.getExperienceLevel());
    profile.setBio(request.getBio());
    profile.setCompanyName(request.getCompanyName());
    profile.setIndustry(request.getIndustry());
    profile.setCompanyDescription(request.getCompanyDescription());

    Profile updated = profileRepository.save(profile);

    return convertToResponse(updated);
    }

    public void deleteProfile(Long userId) {

    Profile profile = profileRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

    profileRepository.delete(profile);
}
}
