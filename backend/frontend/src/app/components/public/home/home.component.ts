import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  featuredProjects = [
    { title: 'E-Commerce Website Frontend', budget: '$3,000', type: 'Fixed Price', tags: ['Angular', 'Bootstrap'] },
    { title: 'Mobile Fitness App Design', budget: '$1,500', type: 'Fixed Price', tags: ['UI/UX', 'Figma'] },
    { title: 'Business Analytics Dashboard', budget: '$4,500', type: 'Hourly', tags: ['Angular', 'D3.js'] }
  ];
}
