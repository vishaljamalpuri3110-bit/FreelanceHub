import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { TeamMember } from '../models';

interface TeamMemberResponse {
  userId: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getProjectTeam(projectId: string): Observable<TeamMember[]> {

    return this.http
      .get<TeamMemberResponse[]>(
        `${this.API_URL}/applications/project/${projectId}/team`
      )
      .pipe(
        map(members =>
          members.map(member => ({
            freelancerId: String(member.userId),
            name: member.name,
            role: member.role,
            skills: [],
            avatarUrl: '',
            availability: ''
          }))
        )
      );
  }
}