import { Component, HostBinding, Input, OnInit } from '@angular/core';

interface Message {
  message: string;
  sent?: boolean;
  received?: boolean;
}

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.css'],
})
export class MessageBubbleComponent implements OnInit {
  @Input() message: Message;

  @HostBinding('class.message--sent') get sent(): Boolean {
    return this.message?.sent;
  }

  constructor() {}

  ngOnInit(): void {}
}
