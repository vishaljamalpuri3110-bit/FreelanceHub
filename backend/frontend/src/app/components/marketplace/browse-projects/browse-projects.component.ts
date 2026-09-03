import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models';

@Component({
  selector: 'app-browse-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './browse-projects.component.html',
  styleUrls: ['./browse-projects.component.scss']
})
export class BrowseProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  
  // Filters
  searchQuery = '';
  selectedCategory = 'All';
  
  categories = ['All', 'Web Development', 'Design', 'Marketing', 'Writing'];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.projectService.searchProjects(this.searchQuery, this.selectedCategory)
      .subscribe(res => {
        this.projects = res;
        this.loading = false;
      });
  }

  onSearch() {
    this.loadProjects();
  }
}
