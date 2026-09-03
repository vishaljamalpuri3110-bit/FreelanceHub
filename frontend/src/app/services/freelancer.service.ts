import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Freelancer, Experience, Education, PortfolioItem } from '../models';

interface ProfileResponse {
  id: number;
  userId: number;

  name: string;
  email: string;
  role: string;

  profilePhoto?: string;
  location?: string;
  skills?: string;
  experienceLevel?: string;
  education?: string;
  portfolio?: string;
  hourlyRate?: number;
  availability?: string;
  bio?: string;

  companyName?: string;
  industry?: string;
  companyDescription?: string;
  previousProjects?: string;
  contactInformation?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {

  private readonly API_URL = 'http://localhost:8080';

  private freelancers = signal<Freelancer[]>([]);

  constructor(private http: HttpClient) {}

  getFreelancers(): Observable<Freelancer[]> {
    return this.http.get<ProfileResponse[]>(
      `${this.API_URL}/profiles/search`
    ).pipe(
      map(profiles =>
        profiles
          .filter(p => p.role?.toUpperCase() === 'FREELANCER')
          .map(p => this.mapProfileToFreelancer(p))
      )
    );
  }

  getFreelancerById(id: string): Observable<Freelancer> {
    return this.http.get<ProfileResponse>(
      `${this.API_URL}/profiles/user/${id}`
    ).pipe(
      map(profile => this.mapProfileToFreelancer(profile))
    );
  }

  searchFreelancers(
    query: string,
    skill?: string
  ): Observable<Freelancer[]> {

    return this.getFreelancers().pipe(
      map(freelancers => {

        let results = freelancers;

        if (query) {
          const lowerQuery = query.toLowerCase();

          results = results.filter(f =>
            f.name.toLowerCase().includes(lowerQuery) ||
            f.title.toLowerCase().includes(lowerQuery)
          );
        }

        if (skill && skill !== 'All') {
          const lowerSkill = skill.toLowerCase();

          results = results.filter(f =>
            f.skills.some(s =>
              s.toLowerCase().includes(lowerSkill)
            )
          );
        }

        return results;
      })
    );
  }


updateProfile(
  userId: string,
  request: any
): Observable<Freelancer> {

  return this.http.put<ProfileResponse>(
    `${this.API_URL}/profiles/user/${userId}`,
    request
  ).pipe(
    map(profile =>
      this.mapProfileToFreelancer(profile)
    )
  );
}






  private mapProfileToFreelancer(
    profile: ProfileResponse
  ): Freelancer {

    return {
      id: String(profile.userId),

      name: profile.name,

      email: profile.email,

      role: 'freelancer',

      avatarUrl: profile.profilePhoto || '',

      title: profile.experienceLevel || 'Freelancer',

      location: profile.location || '',

      hourlyRate: profile.hourlyRate ?? 0,

      availability: profile.availability || '',

      about: profile.bio || '',

      skills: this.parseSkills(profile.skills),

      experience: [],

      education: this.parseEducation(profile.education),

      portfolio: this.parsePortfolio(profile.portfolio),

      rating: 0,

      completedProjects: 0
    };
  }

  private parseSkills(skills?: string): string[] {

    if (!skills) {
      return [];
    }

    return skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
  }

  private parseEducation(education?: string): Education[] {

    if (!education) {
      return [];
    }

    // If backend stores JSON array
    try {
      const parsed = JSON.parse(education);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Not JSON, continue below
    }

    // If backend stores simple text
    return [{
      id: '1',
      degree: education,
      institution: '',
      year: ''
    }];
  }

  private parsePortfolio(portfolio?: string): PortfolioItem[] {

    if (!portfolio) {
      return [];
    }

    // If backend stores JSON array
    try {
      const parsed = JSON.parse(portfolio);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Not JSON, continue below
    }

    // If backend stores a single URL
    if (
      portfolio.startsWith('http://') ||
      portfolio.startsWith('https://')
    ) {
      return [{
        id: '1',
        title: 'Portfolio',
        description: 'My portfolio',
        imageUrl: '',
        link: portfolio
      }];
    }

    // If backend stores normal text
    return [{
      id: '1',
      title: 'Portfolio',
      description: portfolio,
      imageUrl: ''
    }];
  }
}