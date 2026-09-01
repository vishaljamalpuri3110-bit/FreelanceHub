package com.freelancer.freelancer_platform.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.freelancer.freelancer_platform.dto.ApplicationRequest;
import com.freelancer.freelancer_platform.dto.ApplicationResponse;
import com.freelancer.freelancer_platform.dto.TeamMemberResponse;
import com.freelancer.freelancer_platform.entity.Application;
import com.freelancer.freelancer_platform.entity.ApplicationStatus;
import com.freelancer.freelancer_platform.entity.Project;
import com.freelancer.freelancer_platform.entity.ProjectStatus;
import com.freelancer.freelancer_platform.entity.User;
import com.freelancer.freelancer_platform.repository.ApplicationRepository;
import com.freelancer.freelancer_platform.repository.ProjectRepository;
import com.freelancer.freelancer_platform.repository.UserRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            ProjectRepository projectRepository,
            UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    // CREATE APPLICATION
    public ApplicationResponse createApplication(ApplicationRequest request) {

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User freelancer = userRepository.findById(request.getFreelancerId())
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));

        Application application = new Application();

        application.setProject(project);
        application.setFreelancer(freelancer);
        application.setCoverLetter(request.getCoverLetter());
        application.setProposedBudget(request.getProposedBudget());

        application.setStatus(ApplicationStatus.PENDING);

        Application saved = applicationRepository.save(application);

        return convertToResponse(saved);
    }

    // GET APPLICATIONS FOR PROJECT
    public List<ApplicationResponse> getApplicationsByProject(Long projectId) {

        return applicationRepository.findByProjectId(projectId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // GET APPLICATIONS BY FREELANCER
    public List<ApplicationResponse> getApplicationsByFreelancer(Long freelancerId) {

        return applicationRepository.findByFreelancerId(freelancerId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // GET BY ID
    public ApplicationResponse getApplicationById(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        return convertToResponse(application);
    }

    // ACCEPT
    public ApplicationResponse acceptApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.ACCEPTED);

        Project project = application.getProject();
        project.setStatus(ProjectStatus.IN_PROGRESS);

        projectRepository.save(project);

        Application updated = applicationRepository.save(application);

        return convertToResponse(updated);
    }

    // REJECT
    public ApplicationResponse rejectApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.REJECTED);

        Application updated = applicationRepository.save(application);

        return convertToResponse(updated);
    }

    // DELETE
    public void deleteApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        applicationRepository.delete(application);
    }

    // ENTITY → RESPONSE
    private ApplicationResponse convertToResponse(Application application) {

        ApplicationResponse response = new ApplicationResponse();

        response.setId(application.getId());

        response.setProjectId(application.getProject().getId());
        response.setProjectTitle(application.getProject().getTitle());

        response.setFreelancerId(application.getFreelancer().getId());
        response.setFreelancerName(application.getFreelancer().getName());

        response.setCoverLetter(application.getCoverLetter());
        response.setProposedBudget(application.getProposedBudget());

        response.setStatus(application.getStatus());

        response.setCreatedAt(application.getCreatedAt());
        response.setUpdatedAt(application.getUpdatedAt());

        return response;
    }

    public List<TeamMemberResponse> getTeamMembers(Long projectId) {

    return applicationRepository
            .findByProjectIdAndStatus(
                    projectId,
                    ApplicationStatus.ACCEPTED
            )
            .stream()
            .map(application -> {

                User freelancer = application.getFreelancer();

                TeamMemberResponse response = new TeamMemberResponse();

                response.setUserId(freelancer.getId());
                response.setName(freelancer.getName());
                response.setEmail(freelancer.getEmail());
                response.setRole(freelancer.getRole().name());

                return response;
            })
            .toList();
}
}