import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { ChatService, Message } from '../chat.service';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css'],
})
export class MessageViewComponent implements OnChanges {
  @ViewChild('chatwindow', { static: false }) chatWindow: ElementRef;
  @Input() conversationId: string;
  @Input() phoneNumber: string;

  message = '';
  messages = [];

  constructor(private chat: ChatService) {}

  private scrollToBottom(): void {
    try {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    } catch (error) {}
  }

  private getMessages(): void {
    this.chat.getMessages(this.conversationId).subscribe(
      (messages) => {
        this.messages = messages;
      },
      (err) => console.error(err)
    );
  }

  send(): void {
    if (this.message.length > 0) {
      const toSend = {
        message: this.message,
        to: this.phoneNumber,
        conversationId: this.conversationId,
      };
      this.messages.push({ message: this.message, sent: true });
      this.chat.sendMessage(toSend).subscribe(
        () => {},
        (err) => console.error(err)
      );
      this.message = '';
    }
  }

  sendOnEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  ngOnChanges(): void {
    this.getMessages();
    this.chat.chatUpdated.subscribe(() => this.getMessages());
  }
}
