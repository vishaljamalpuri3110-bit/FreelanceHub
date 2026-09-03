import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map,of } from 'rxjs';

import { Project, Application } from '../models';


interface ProjectResponse {
  id: number;
  clientId: number;
  clientName: string;

  title: string;
  description: string;
  budget: number;
  deadline: string;
  skillsRequired: string;
  category: string;
  status: string;

  createdAt?: string;
  updatedAt?: string;
}

interface ApplicationResponse {
  id: number;
  projectId: number;
  projectTitle: string;

  freelancerId: number;
  freelancerName: string;

  coverLetter?: string;
  proposedBudget: number;

  status: string;

  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // =========================
  // GET ALL PROJECTS
  // =========================

  getProjects(): Observable<Project[]> {

    return this.http
      .get<ProjectResponse[]>(
        `${this.API_URL}/projects`
      )
      .pipe(
        map(projects =>
          projects.map(project =>
            this.mapProject(project)
          )
        )
      );
  }


  // =========================
  // GET PROJECT BY ID
  // =========================

  getProjectById(
    id: string
  ): Observable<Project | undefined> {

    return this.http
      .get<ProjectResponse>(
        `${this.API_URL}/projects/${id}`
      )
      .pipe(
        map(project =>
          this.mapProject(project)
        )
      );
  }


  // =========================
  // SEARCH PROJECTS
  // =========================

  searchProjects(
    query: string,
    category?: string
  ): Observable<Project[]> {

    let params = new HttpParams();

    if (query) {
      params = params.set(
        'keyword',
        query
      );
    }

    if (category && category !== 'All') {
      params = params.set(
        'category',
        category
      );
    }

    return this.http
      .get<ProjectResponse[]>(
        `${this.API_URL}/projects/search`,
        { params }
      )
      .pipe(
        map(projects =>
          projects.map(project =>
            this.mapProject(project)
          )
        )
      );
  }


  // =========================
  // GET CLIENT PROJECTS
  // =========================

  getClientProjects(
    clientId: string
  ): Observable<Project[]> {

    return this.http
      .get<ProjectResponse[]>(
        `${this.API_URL}/projects/client/${clientId}`
      )
      .pipe(
        map(projects =>
          projects.map(project =>
            this.mapProject(project)
          )
        )
      );
  }


  // =========================
  // CREATE PROJECT
  // =========================

  createProject(
    project: any
  ): Observable<Project> {

    return this.http
      .post<ProjectResponse>(
        `${this.API_URL}/projects`,
        project
      )
      .pipe(
        map(response =>
          this.mapProject(response)
        )
      );
  }


  // =========================
  // UPDATE PROJECT
  // =========================

  updateProject(
    id: string,
    project: any
  ): Observable<Project> {

    return this.http
      .put<ProjectResponse>(
        `${this.API_URL}/projects/${id}`,
        project
      )
      .pipe(
        map(response =>
          this.mapProject(response)
        )
      );
  }


  // =========================
  // DELETE PROJECT
  // =========================

  deleteProject(
    id: string
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.API_URL}/projects/${id}`
    );
  }

getProjectApplications(projectId: string): Observable<ApplicationResponse[]> {
  return this.http.get<ApplicationResponse[]>(
    `${this.API_URL}/applications/project/${projectId}`
  );
}

acceptApplication(applicationId: string): Observable<ApplicationResponse> {
  return this.http.put<ApplicationResponse>(
    `${this.API_URL}/applications/${applicationId}/accept`,
    {}
  );
}

rejectApplication(applicationId: string): Observable<ApplicationResponse> {
  return this.http.put<ApplicationResponse>(
    `${this.API_URL}/applications/${applicationId}/reject`,
    {}
  );
}
getProjectTeam(projectId: string): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.API_URL}/applications/project/${projectId}/team`
  );
}
  // =========================
  // MAP BACKEND → ANGULAR
  // =========================

  private mapProject(
    project: ProjectResponse
  ): Project {

    return {
  id: String(project.id),
  clientId: String(project.clientId),
  clientName: project.clientName,
  title: project.title,
  description: project.description,
  category: project.category || '',
  requiredSkills: this.parseSkills(project.skillsRequired),
  budget: project.budget ?? 0,
  deadline: project.deadline,
  createdAt: project.createdAt,
  experienceLevel: '',
  projectType: '',
  status: this.mapStatus(project.status),
  applicantsCount: 0
};
  }


  // =========================
  // SKILLS STRING → ARRAY
  // =========================

  private parseSkills(
    skills?: string
  ): string[] {

    if (!skills) {
      return [];
    }

    return skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
  }


  // =========================
  // STATUS MAPPING
  // =========================

  private mapStatus(
    status: string
  ): 'open' | 'in-progress' | 'completed' {

    switch (status?.toUpperCase()) {

      case 'IN_PROGRESS':
      case 'IN-PROGRESS':
        return 'in-progress';

      case 'COMPLETED':
        return 'completed';

      default:
        return 'open';
    }
  }

  // =========================
// GET FREELANCER APPLICATIONS
// =========================

getFreelancerApplications(
  freelancerId: string
): Observable<Application[]> {

  return this.http
    .get<ApplicationResponse[]>(
      `${this.API_URL}/applications/my`
    )
    .pipe(
      map(applications =>
        applications.map(application =>
          this.mapApplication(application)
        )
      )
    );
}

applyForProject(
  application: Omit<Application, 'id' | 'status' | 'appliedDate'>
): Observable<boolean> {

  return this.http
    .post<ApplicationResponse>(
      `${this.API_URL}/applications`,
      application
    )
    .pipe(
      map(() => true)
    );
}

// =========================
// GET FREELANCER PROJECTS
// =========================

getFreelancerProjects(
  freelancerId: string
): Observable<Project[]> {

  // Temporary until application/project relationship is integrated
  return of([]);
}

private mapApplication(
  application: ApplicationResponse
): Application {

  return {
    id: String(application.id),

    projectId: String(application.projectId),
    projectTitle: application.projectTitle,

    freelancerId: String(application.freelancerId),
    freelancerName: application.freelancerName,

    clientId: '',
    clientName: '',

    appliedDate: application.createdAt || '',

    budget: application.proposedBudget ?? 0,
    proposedBudget: application.proposedBudget ?? 0,

    status: this.mapApplicationStatus(application.status)
  };
}
private mapApplicationStatus(
  status: string
): 'pending' | 'shortlisted' | 'accepted' | 'rejected' {

  switch (status?.toUpperCase()) {

    case 'ACCEPTED':
      return 'accepted';

    case 'REJECTED':
      return 'rejected';

    case 'SHORTLISTED':
      return 'shortlisted';

    default:
      return 'pending';
  }
}




}