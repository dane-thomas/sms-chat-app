import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MessageListItemComponent } from './message-list-item/message-list-item.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ChatComponent,
    LoginComponent,
    HomeComponent,
    MessageListItemComponent,
    MessageViewComponent,
    MessageBubbleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
