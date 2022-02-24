import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Pagination, PagintedResult } from '../_models/Pagination';
import { Message } from '../_models/message';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodeToken.nameid,
      this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((res: any) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}