import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

interface Message {
  contact: string;
  message: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  details: UserDetails;
  messages: Message[] = [
    {
      contact: 'a person',
      message: 'this is a test',
    },
    {
      contact: 'a person',
      message: 'this is a test of a long message which should truncate',
    },
    {
      contact: 'a person',
      message: 'this is a test',
    },
  ];
  selected: number;

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.auth.profile().subscribe(
      (user) => {
        this.details = user;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onMessageClick(i: number): void {
    this.selected = i;
  }
}
