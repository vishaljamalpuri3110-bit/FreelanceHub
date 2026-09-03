import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../services/auth.service';
import { Notification } from '../../../models';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.notificationService.getUserNotifications(user.id).subscribe(n => {
        this.notifications = n;
      });
    }
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id).subscribe(() => {
      const n = this.notifications.find(notif => notif.id === id);
      if (n) {
        n.read = true;
      }
    });
  }

  markAllAsRead() {
    // In a real app, you would call a service method to mark all as read
    this.notifications.forEach(n => n.read = true);
  }
}
