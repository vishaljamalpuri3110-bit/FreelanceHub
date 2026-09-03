import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Task } from '../models';

interface TaskResponse {
  id: number;
  projectId: number;
  projectTitle: string;
  title: string;
  description: string;
  assignedToId?: number;
  assignedToName?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TaskRequest {
  projectId: number;
  title: string;
  description: string;
  assignedToId?: number;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // GET TASKS OF PROJECT
  getProjectTasks(projectId: string): Observable<Task[]> {

    return this.http
      .get<TaskResponse[]>(
        `${this.API_URL}/tasks/project/${projectId}`
      )
      .pipe(
        map(tasks =>
          tasks.map(task => this.mapTask(task))
        )
      );
  }

  // CREATE TASK
  addTask(task: any): Observable<Task> {

    const request: TaskRequest = {
      projectId: Number(task.projectId),
      title: task.title,
      description: task.description,
      assignedToId: task.assignedToId,
      status: task.status
    };

    return this.http
      .post<TaskResponse>(
        `${this.API_URL}/tasks`,
        request
      )
      .pipe(
        map(task => this.mapTask(task))
      );
  }

  // UPDATE TASK STATUS
  updateTaskStatus(
  taskId: string,
  newStatus: Task['status']
): Observable<Task> {

  const backendStatus = this.mapStatusToBackend(newStatus);

  return this.http
    .put<TaskResponse>(
      `${this.API_URL}/tasks/${taskId}/status`,
      JSON.stringify(backendStatus),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .pipe(
      map(task => this.mapTask(task))
    );
}

  // BACKEND TASK → ANGULAR TASK
  private mapTask(task: TaskResponse): Task {

    return {
      id: String(task.id),

      projectId: String(task.projectId),

      title: task.title,

      assignedTo: task.assignedToId
        ? String(task.assignedToId)
        : undefined,

      assigneeName: task.assignedToName || 'Unassigned',

      priority: 'Medium',

      createdAt: task.createdAt || '',

      dueDate: '',

      status: this.mapStatusToFrontend(task.status)
    };
  }

  // BACKEND STATUS → FRONTEND STATUS
  private mapStatusToFrontend(
  status: string
): 'To Do' | 'In Progress' | 'Completed' {

  switch (status?.toUpperCase()) {

    case 'IN_PROGRESS':
      return 'In Progress';

    case 'DONE':
      return 'Completed';

    case 'TODO':
    default:
      return 'To Do';
  }
}

  // FRONTEND STATUS → BACKEND STATUS
private mapStatusToBackend(
  status: Task['status']
): 'TODO' | 'IN_PROGRESS' | 'DONE' {

  switch (status) {

    case 'In Progress':
      return 'IN_PROGRESS';

    case 'Completed':
      return 'DONE';

    case 'To Do':
    default:
      return 'TODO';
  }
}
  }
