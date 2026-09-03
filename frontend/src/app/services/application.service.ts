import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApplicationResponse {
  id: number;
  projectId: number;
  projectTitle: string;
  freelancerId: number;
  freelancerName: string;
  coverLetter?: string;
  proposedBudget?: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getApplicationsByProject(
    projectId: string
  ): Observable<ApplicationResponse[]> {

    return this.http.get<ApplicationResponse[]>(
      `${this.API_URL}/applications/project/${projectId}`
    );
  }
  getMyApplications(): Observable<ApplicationResponse[]> {

  return this.http.get<ApplicationResponse[]>(
    `${this.API_URL}/applications/my`
  );
}
}