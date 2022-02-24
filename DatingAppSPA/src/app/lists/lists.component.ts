
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PagintedResult } from '../_models/Pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: any ;

  constructor(
    private userService: UserService,
              private authService: AuthService,
               private routes: ActivatedRoute,
               private alertify: AlertifyService) { }

  ngOnInit() {
    this.routes.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  loadUsers()
  {
    this.userService.GetUsers(this.pagination.currentPage, this.pagination.itemsPerPage,null,this.likesParam)
    .subscribe((res: PagintedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
