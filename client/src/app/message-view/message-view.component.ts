import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css'],
})
export class MessageViewComponent implements OnInit {
  message = '';
  messages = [
    {
      message: 'I sent this',
      sent: true,
    },
    {
      message: 'But I sent this',
      received: true,
    },
    {
      message: 'And this',
      received: true,
    },
  ];

  constructor() {}

  send(): void {
    if (this.message.length > 0) {
      console.log(this.message);
      this.messages.push({ message: this.message, sent: true });
      this.message = '';
    }
  }

  sendOnEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  ngOnInit(): void {}
}
