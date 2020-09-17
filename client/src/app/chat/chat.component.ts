import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  details: UserDetails;
  conversations;
  selected: number;

  constructor(private auth: AuthenticationService, private chat: ChatService) {}

  private getConversations(): void {
    this.chat.getConversations().subscribe(
      (conversations) => {
        this.conversations = conversations;
      },
      (err) => console.error(err)
    );
  }

  ngOnInit(): void {
    this.chat.setupSocket();
    this.getConversations();
    this.chat.chatUpdated.subscribe(() => this.getConversations());
  }

  onLogoutClick(): void {
    this.auth.logout();
  }

  onNewClick(): void {
    let phoneNumber = prompt('Enter phone number to text');
    phoneNumber = '+' + phoneNumber.replace(/\D/g, '');
    if (phoneNumber.length === 12) {
      this.chat.makeConversation(phoneNumber).subscribe(
        (conversation) => {
          this.conversations.push(conversation);
          this.selected = this.conversations.length - 1;
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      alert('Please enter a valid phone number');
    }
  }

  onMessageClick(i: number): void {
    this.selected = i;
  }
}
