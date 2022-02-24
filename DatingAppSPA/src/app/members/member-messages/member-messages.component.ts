import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userId: number;
  messages: Message[];
  newMessage: any= {} ;

  constructor(private userService: UserService,
          private authService: AuthService,
          private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    this.userService.getMessageThread(this.authService.decodeToken.nameid, this.userId)
      .subscribe(messages => {this.messages = messages}
        , error => {
          this.alertifyService.error(error);
        });
  }

  sendMessage(){
    this.newMessage.recipientId = this.userId;
    this.userService.sendMessage(this.authService.decodeToken.nameid, this.newMessage)
    .subscribe(message => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {this.alertifyService.error(error)}
    );
  }
}
