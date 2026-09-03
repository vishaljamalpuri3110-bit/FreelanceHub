import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Notification } from '../models';

interface NotificationResponse {
  id: number;
  userId: number;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // GET USER NOTIFICATIONS
  getUserNotifications(
    userId: string
  ): Observable<Notification[]> {

    return this.http
      .get<NotificationResponse[]>(
        `${this.API_URL}/notifications/user/${userId}`
      )
      .pipe(
        map(notifications =>
          notifications.map(notification =>
            this.mapNotification(notification)
          )
        )
      );
  }

  // MARK ONE NOTIFICATION AS READ
  markAsRead(
    notificationId: string
  ): Observable<Notification> {

    return this.http
      .put<NotificationResponse>(
        `${this.API_URL}/notifications/${notificationId}/read`,
        {}
      )
      .pipe(
        map(notification =>
          this.mapNotification(notification)
        )
      );
  }

  // BACKEND → ANGULAR MODEL
  private mapNotification(
  notification: NotificationResponse
): Notification {

  return {
    id: String(notification.id),
    userId: String(notification.userId),
    title: this.getNotificationTitle(notification.type),
    message: notification.message,
    type: this.mapNotificationType(notification.type),
    read: notification.read,
    timestamp: notification.createdAt,
    link: this.getNotificationLink(notification.type)
  };
}

  // CREATE A USER-FRIENDLY TITLE
  private getNotificationTitle(type: string): string {

    switch (type?.toUpperCase()) {

      case 'APPLICATION_ACCEPTED':
        return 'Application Accepted';

      case 'APPLICATION_REJECTED':
        return 'Application Rejected';

      case 'NEW_APPLICATION':
        return 'New Application';

      case 'PROJECT_UPDATE':
        return 'Project Update';

      case 'MESSAGE':
        return 'New Message';

      default:
        return 'Notification';
    }
  }

  // OPTIONAL NAVIGATION LINK
  private getNotificationLink(type: string): string | undefined {

    switch (type?.toUpperCase()) {

      case 'APPLICATION_ACCEPTED':
      case 'APPLICATION_REJECTED':
        return '/freelancer/applications';

      case 'NEW_APPLICATION':
        return '/projects/my-projects';

      default:
        return undefined;
    }
  }

  private mapNotificationType(
  type: string
): Notification['type'] {

  switch (type?.toUpperCase()) {

    case 'APPLICATION_ACCEPTED':
      return 'application_accepted';

    case 'APPLICATION_REJECTED':
      return 'application_rejected';

    case 'NEW_APPLICATION':
      return 'new_application';

    case 'PROJECT_UPDATE':
      return 'project_update';

    case 'MESSAGE':
      return 'message';

    case 'SYSTEM':
      return 'system';

    case 'SUCCESS':
      return 'success';

    case 'WARNING':
      return 'warning';

    default:
      return 'info';
  }
}
}