import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/observable/of';
import 'rxjs/add/operator/catch'
import { PagintedResult } from '../_models/Pagination';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthService } from '../_services/auth.service';

@Injectable()
    export class MessagesResolver implements Resolve<PagintedResult<Message[]>>{
    pageSize = 5;
    pageNumber = 1;
    messageContainer = 'Unread';

    constructor(private userService: UserService, private authservice: AuthService,
        private router: Router, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) : PagintedResult<Message[]> | Observable<PagintedResult<Message[]>> | Promise<PagintedResult<Message[]>> {
        return this.userService.getMessages( this.authservice.decodeToken.nameid 
            ,this.pageNumber, this.pageSize, this.messageContainer).catch(error => {
            this.alertify.error('Problem retieving data');
            this.router.navigate(['/members']);
            return  Observable.throw(null);
        });
    }
}