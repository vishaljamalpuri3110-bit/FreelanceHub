package com.freelancer.freelancer_platform.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.freelancer_platform.dto.ProfileRequest;
import com.freelancer.freelancer_platform.dto.ProfileResponse;
import com.freelancer.freelancer_platform.service.ProfileService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/profiles")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ProfileResponse createProfile(
            @Valid @RequestBody ProfileRequest request) {

        return profileService.createProfile(request);
    }

    @GetMapping("/user/{userId}")
    public ProfileResponse getProfile(@PathVariable Long userId) {

        return profileService.getProfileByUserId(userId);
    }

    @PutMapping("/user/{userId}")
    public ProfileResponse updateProfile(@PathVariable Long userId, @Valid @RequestBody ProfileRequest profileRequest){
        return profileService.updateProfile(userId, profileRequest);
    }

    @DeleteMapping("/user/{userId}")
    public void deleteProfile(@PathVariable Long userId){
        profileService.deleteProfile(userId);
    }
}
