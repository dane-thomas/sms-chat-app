import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.css'],
})
export class MessageListItemComponent implements OnInit {
  @Input() contact: number;
  @Input() preview: string;
  @Input() selected: boolean;

  constructor() {}

  ngOnInit(): void {}
}
