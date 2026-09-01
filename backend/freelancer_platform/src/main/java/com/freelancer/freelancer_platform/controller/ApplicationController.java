package com.freelancer.freelancer_platform.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.freelancer_platform.dto.ApplicationRequest;
import com.freelancer.freelancer_platform.dto.ApplicationResponse;
import com.freelancer.freelancer_platform.service.ApplicationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ApplicationResponse createApplication(
            @Valid @RequestBody ApplicationRequest request) {

        return applicationService.createApplication(request);
    }

    @GetMapping("/project/{projectId}")
    public List<ApplicationResponse> getByProject(
            @PathVariable Long projectId) {

        return applicationService.getApplicationsByProject(projectId);
    }

    @GetMapping("/freelancer/{freelancerId}")
    public List<ApplicationResponse> getByFreelancer(
            @PathVariable Long freelancerId) {

        return applicationService.getApplicationsByFreelancer(freelancerId);
    }

    @GetMapping("/{id}")
    public ApplicationResponse getById(
            @PathVariable Long id) {

        return applicationService.getApplicationById(id);
    }

    @PutMapping("/{id}/accept")
    public ApplicationResponse accept(
            @PathVariable Long id) {

        return applicationService.acceptApplication(id);
    }

    @PutMapping("/{id}/reject")
    public ApplicationResponse reject(
            @PathVariable Long id) {

        return applicationService.rejectApplication(id);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id) {

        applicationService.deleteApplication(id);
    }
}