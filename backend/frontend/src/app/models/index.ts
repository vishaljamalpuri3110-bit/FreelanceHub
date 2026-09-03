export type UserRole = 'freelancer' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Freelancer extends User {
  role: 'freelancer';
  title: string;
  location: string;
  hourlyRate: number;
  availability: string;
  about: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  portfolio: PortfolioItem[];
  rating: number;
  completedProjects: number;
}

export interface Client extends User {
  role: 'client';
  companyName: string;
  industry: string;
  companyDescription: string;
  postedProjects: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  category: string;
  requiredSkills: string[];
  budget: number;
  deadline: string;
  experienceLevel: string;
  projectType: string;
  status: 'open' | 'in-progress' | 'completed';
  applicantsCount: number;
  progress?: number;
  createdAt?: string;
}

export interface Application {
  id: string;
  projectId: string;
  projectTitle: string;
  freelancerId: string;
  freelancerName: string;
  clientId: string;
  clientName: string;
  appliedDate: string;
  budget: number;
  proposedBudget: number;
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
}

export interface TeamMember {
  freelancerId: string;
  name: string;
  role: string;
  skills: string[];
  avatarUrl?: string;
  availability: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  assignedTo?: string; // freelancerId
  assigneeName?: string;
  priority: 'Low' | 'Medium' | 'High';
  createdAt?: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Completed';
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
  avatarUrl?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'message' | 'application_accepted' | 'application_rejected' | 'new_application' | 'project_update' | 'system';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Review {
  id: string;
  projectId: string;
  reviewerId: string;
  reviewerName: string;
  revieweeId: string;
  rating: number;
  comment: string;
  date: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'FREELANCER' | 'CLIENT';
  profilePhoto?: string;
  location?: string;
  skills?: string[];
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