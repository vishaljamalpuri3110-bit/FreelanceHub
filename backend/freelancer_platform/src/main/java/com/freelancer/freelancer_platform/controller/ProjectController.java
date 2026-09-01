package com.freelancer.freelancer_platform.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.freelancer_platform.dto.ProjectRequest;
import com.freelancer.freelancer_platform.dto.ProjectResponse;
import com.freelancer.freelancer_platform.entity.ProjectStatus;
import com.freelancer.freelancer_platform.service.ProjectService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // CREATE
    @PostMapping
    public ProjectResponse createProject(
            @Valid @RequestBody ProjectRequest request) {

        return projectService.createProject(request);
    }


    // GET ALL
    @GetMapping
    public List<ProjectResponse> getAllProjects() {

        return projectService.getAllProjects();
    }

    @GetMapping("/search")
public List<ProjectResponse> searchProjects(
        @RequestParam(required = false) String skill,
        @RequestParam(required = false) Double minBudget,
        @RequestParam(required = false) Double maxBudget,
        @RequestParam(required = false) ProjectStatus status) {

    return projectService.searchProjects(
            skill,
            minBudget,
            maxBudget,
            status
    );
}
    
    @GetMapping("/{id}")
    public ProjectResponse getProjectById(
            @PathVariable Long id) {

        return projectService.getProjectById(id);
    }


    // UPDATE
    @PutMapping("/{id}")
    public ProjectResponse updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request) {

        return projectService.updateProject(id, request);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public void deleteProject(
            @PathVariable Long id) {

        projectService.deleteProject(id);
    }

    
}