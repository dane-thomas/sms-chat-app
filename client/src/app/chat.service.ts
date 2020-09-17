import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

export interface Message {
  message: string;
  to: string;
  conversationId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket;
  chatUpdated: Observable<any>;

  constructor(private auth: AuthenticationService, private http: HttpClient) {}

  private request(
    method: 'post' | 'get',
    type: 'conversation' | 'conversations' | 'message' | 'messages',
    body?
  ): Observable<any> {
    let base$;

    if (method === 'post') {
      base$ = this.http.post(`/api/chat/${type}`, body, {
        headers: { Authorization: `Bearer ${this.auth.getToken()}` },
      });
    } else {
      if (type === 'messages') {
        base$ = this.http.get(
          `/api/chat/${type}?conversationId=${body.conversationId}`,
          {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` },
          }
        );
      } else {
        base$ = this.http.get(`/api/chat/${type}`, {
          headers: { Authorization: `Bearer ${this.auth.getToken()}` },
        });
      }
    }

    const request = base$.pipe(map((data) => data));

    return request;
  }

  public setupSocket(): void {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.chatUpdated = new Observable((subscriber) => {
      this.socket.on('sms-received', () => subscriber.next());
    });
  }

  public makeConversation(phoneNumber: string): Observable<any> {
    return this.request('post', 'conversation', { number: phoneNumber });
  }

  public getConversations(): Observable<any> {
    return this.request('get', 'conversations');
  }

  public sendMessage(message: Message): Observable<any> {
    return this.request('post', 'message', message);
  }

  public getMessages(conversationId: string): Observable<any> {
    return this.request('get', 'messages', { conversationId });
  }
}
