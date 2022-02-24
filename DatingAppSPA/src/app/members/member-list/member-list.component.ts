import { Pagination, PagintedResult } from './../../_models/Pagination';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

    users: User[] = [];
    user: User = JSON.parse(localStorage.getItem('user'));
    genderList = [{ value : 'male' , display : 'Males'} ,{ value : 'female' , display : 'Females'}];
    // userParams: any={gender:'male',minAge:18,maxAge:99};
    userParams: any = {};
    pagination: Pagination;
    

  constructor(private userservice: UserService,
    private alertify: AlertifyService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    // this.userParams.gender = (this.user.gender == 'female') ? 'male' : 'female';
    if(this.userParams.gender == 'female')
    {
      this.userParams.gender = 'male';
    }else
    {
      this.userParams.gender = 'female';
    }
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  loadUsers()
  {
    this.userservice.GetUsers(this.pagination.currentPage, this.pagination.itemsPerPage,this.userParams)
    .subscribe((res: PagintedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  resetFilters(){
    // this.userParams.gender = 'female' //this.user.gender === 'female' ? 'male' : 'female';
    if(this.userParams.gender == 'female')
    {
      this.userParams.gender = 'male';
    }else
    {
      this.userParams.gender = 'female';
    }
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  pageChanged(event: any): void{
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
