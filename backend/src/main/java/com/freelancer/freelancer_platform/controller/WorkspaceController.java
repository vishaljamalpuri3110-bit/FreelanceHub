package com.freelancer.freelancer_platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.freelancer_platform.dto.WorkspaceResponse;
import com.freelancer.freelancer_platform.service.WorkspaceService;

@RestController
@RequestMapping("/workspaces")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @GetMapping("/project/{projectId}")
    public WorkspaceResponse getWorkspace(
            @PathVariable Long projectId) {

        return workspaceService.getWorkspace(projectId);
    }
}