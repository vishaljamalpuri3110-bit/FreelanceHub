import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProjectService } from '../../../services/project.service';
import { TaskService } from '../../../services/task.service';
import { TeamService } from '../../../services/team.service';
import { AuthService } from '../../../services/auth.service';

import { Project, Task } from '../../../models';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  project: Project | undefined;

  tasks: Task[] = [];

  teamMembers: any[] = [];

  loading = true;
  loadingTeam = false;

  activeTab = 'tasks';

  newTaskTitle = '';

  selectedAssigneeId = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private teamService: TeamService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading = false;
      return;
    }

    this.projectService.getProjectById(id).subscribe({
      next: project => {

        this.project = project;

        this.loadTasks(id);
        this.loadTeam(id);
      },

      error: error => {

        console.error(
          'Failed to load project:',
          error
        );

        this.project = undefined;
        this.loading = false;
      }
    });
  }

  // =========================
  // TASKS
  // =========================

  loadTasks(projectId: string): void {

    this.taskService
      .getProjectTasks(projectId)
      .subscribe({

        next: tasks => {

          this.tasks = tasks;
          this.loading = false;
        },

        error: error => {

          console.error(
            'Failed to load tasks:',
            error
          );

          this.tasks = [];
          this.loading = false;
        }
      });
  }

  addTask(): void {

    if (
      !this.newTaskTitle.trim() ||
      !this.project
    ) {
      return;
    }

    if (!this.selectedAssigneeId) {
      alert('Please select a team member.');
      return;
    }

    const selectedMember = this.teamMembers.find(
      member =>
        member.freelancerId === this.selectedAssigneeId
    );

    const newTask: any = {

      projectId: this.project.id,

      title: this.newTaskTitle.trim(),

      description: this.newTaskTitle.trim(),

      assignedToId: Number(
        this.selectedAssigneeId
      ),

      status: 'TODO'
    };

    console.log(
      'Creating task:',
      newTask
    );

    this.taskService
      .addTask(newTask)
      .subscribe({

        next: task => {

          this.tasks.push(task);

          this.newTaskTitle = '';

          this.selectedAssigneeId = '';
        },

        error: error => {

          console.error(
            'Failed to add task:',
            error
          );

          alert('Failed to create task.');
        }
      });
  }

  updateTaskStatus(
    task: Task,
    newStatus:
      'To Do' |
      'In Progress' |
      'Completed'
  ): void {

    this.taskService
      .updateTaskStatus(
        task.id,
        newStatus
      )
      .subscribe({

        next: () => {

          task.status = newStatus;
        },

        error: error => {

          console.error(
            'Failed to update task:',
            error
          );
        }
      });
  }

  getTasksByStatus(
    status: string
  ): Task[] {

    return this.tasks.filter(
      task => task.status === status
    );
  }

  getProgress(): number {

    if (this.tasks.length === 0) {
      return 0;
    }

    const completedTasks =
      this.getTasksByStatus('Completed').length;

    return Math.round(
      (completedTasks / this.tasks.length) * 100
    );
  }

  // =========================
  // TEAM
  // =========================

  loadTeam(projectId: string): void {

    this.loadingTeam = true;

    this.teamService
      .getProjectTeam(projectId)
      .subscribe({

        next: members => {

          this.teamMembers = members;

          this.loadingTeam = false;

          console.log(
            'Project team:',
            members
          );
        },

        error: error => {

          console.error(
            'Failed to load team:',
            error
          );

          this.teamMembers = [];

          this.loadingTeam = false;
        }
      });
  }
}