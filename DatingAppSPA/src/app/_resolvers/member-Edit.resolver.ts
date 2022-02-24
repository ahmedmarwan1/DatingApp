import {  catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/observable/of';
import 'rxjs/add/operator/catch'
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{

    constructor(private userService: UserService, 
        private router: Router,
        private alertify: AlertifyService,
        private authservice: AuthService){}

    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
        return this.userService.GetUser(this.authservice.decodeToken.nameid).catch(error => {
            this.alertify.error('Problem retieving data');
            this.router.navigate(['/members']);
            return  Observable.throw(null);
        });
    }
}
