import { User } from './../_models/User';
import { map,  catchError } from 'rxjs/operators';
import { Http, Headers ,RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = "https://localhost:5001/api/auth/";
  userToken : any;
  decodeToken: any;
  JwtHelper: JwtHelperService= new JwtHelperService();

constructor(private http: Http) { }

login(model: any){
    return this.http.post(this.baseurl + 'login' , model, this.requestOptions()).pipe(map((response: Response) =>
    {
      const user = response.json();
      if (user)
      {
        localStorage.setItem('token',user.tokenString);
        this.decodeToken = this.JwtHelper.decodeToken(user.tokenString);
        //console.log(this.JwtHelper.isTokenExpired(user.tokenString));
        // console.log(this.decodeToken);
        this.userToken = user.tokenString;
      }      
    })).pipe(catchError(this.handleError));
}

Regsiter(user : User)
{
    return this.http.post(this.baseurl + 'register',user,this.requestOptions()).pipe(catchError(this.handleError));
}

loggedIn() {
  var token = localStorage.getItem('token');
  if(token){
  return !this.JwtHelper.isTokenExpired(token);
  }
  return false;;
}

  private requestOptions()
  {
    const headers = new Headers({'Content-type': 'application/json'});
    return new RequestOptions({headers: headers});
  }

  private handleError(error : any)
  {
      const ApplicationError = error.headers.get('Application-Error');
      if(ApplicationError){
          return Observable.throw(ApplicationError);
      }     
      const serverError = error.json();
      let modelStateErrors = '';
      if(serverError){
        for(const key in serverError){
          if(serverError[key]){
            modelStateErrors += serverError[key] + '\n';
          }
        }
      } 
      return Observable.throw
      (
        modelStateErrors || 'Server error'
      );
  }
}
