import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Message } from '../models';
import { MOCK_MESSAGES } from '../models/mock-data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages = signal<Message[]>(MOCK_MESSAGES);

  constructor(private authService: AuthService) {}

  getProjectMessages(projectId: string): Observable<Message[]> {
    const projectMsgs = this.messages().filter(m => m.projectId === projectId);
    return of(projectMsgs).pipe(delay(200));
  }

  sendMessage(projectId: string, content: string): Observable<Message> {
    const currentUser = this.authService.currentUser();
    if (!currentUser) throw new Error('User not authenticated');

    const newMessage: Message = {
      id: `m${Date.now()}`,
      projectId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      content,
      timestamp: new Date().toISOString(),
      avatarUrl: currentUser.avatarUrl
    };

    this.messages.update(msgs => [...msgs, newMessage]);
    return of(newMessage).pipe(delay(300));
  }
}
