import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FreelancerService } from '../../../services/freelancer.service';
import { Freelancer } from '../../../models';

@Component({
  selector: 'app-find-freelancers',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './find-freelancers.component.html',
  styleUrls: ['./find-freelancers.component.scss']
})
export class FindFreelancersComponent implements OnInit {
  freelancers: Freelancer[] = [];
  loading = true;
  
  searchQuery = '';
  selectedSkill = 'All';
  
  skills = ['All', 'Angular', 'React', 'UI/UX', 'Node.js', 'Python', 'Figma'];

  constructor(private freelancerService: FreelancerService) {}

  ngOnInit(): void {
    this.loadFreelancers();
  }

  loadFreelancers() {
    this.loading = true;
    this.freelancerService.searchFreelancers(this.searchQuery, this.selectedSkill)
      .subscribe(res => {
        this.freelancers = res;
        this.loading = false;
      });
  }

  onSearch() {
    this.loadFreelancers();
  }
}
