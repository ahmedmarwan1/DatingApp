import {  catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/observable/of';
import 'rxjs/add/operator/catch'
import { PagintedResult } from '../_models/Pagination';

@Injectable()
    export class MemberListResolver implements Resolve<PagintedResult<User[]>>{
    pageSize = 5;
    pageNumber = 1;

    constructor(private userService: UserService, 
        private router: Router, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) : PagintedResult<User[]> | Observable<PagintedResult<User[]>> | Promise<PagintedResult<User[]>> {
        return this.userService.GetUsers(this.pageNumber, this.pageSize).catch(error => {
            this.alertify.error('Problem retieving data');
            this.router.navigate(['/members']);
            return  Observable.throw(null);
        });
    }
}
