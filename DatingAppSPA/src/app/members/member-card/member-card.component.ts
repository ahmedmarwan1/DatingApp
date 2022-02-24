import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';
import { User } from './../../_models/User';
import { Component, Input, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user!: User;
  constructor(private authservice: AuthService,
     private userService: UserService,
     private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number)
  {
    this.userService.SendLike(this.authservice.decodeToken.nameid , id).subscribe(data => {
      this.alertify.success('you have liked: ' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }
}
