import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { User } from './../../_models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-Edit',
  templateUrl: './member-Edit.component.html',
  styleUrls: ['./member-Edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user!: User;
  @ViewChild('editForm') editForm!: NgForm;
  constructor(private route: ActivatedRoute,
    private alertify: AlertifyService, private userService: UserService, private authservice: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  UpdateUser(){
    this.userService.updateUser(this.authservice.decodeToken.nameid,this.user).subscribe(next => {
      this.alertify.success('Profile Updated Successfully');
      this.editForm.reset(this.user);
    },error => {
      this.alertify.error(error);
    });
    
  }
}
