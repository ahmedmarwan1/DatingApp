import {  catchError, map } from 'rxjs/operators';
import { Http, Headers, RequestOptions ,Response} from '@angular/http';
import { User } from './../_models/User';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { PagintedResult } from '../_models/Pagination';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    baseUrl = environment.apiUrl;
constructor(private http: Http) { }

    GetUsers(page?: number,itemsPerPage?: number,userParams?: any,likesParams?: any) : Observable<PagintedResult<User[]>>
    {
      const paginatedResult: PagintedResult<User[]> = new PagintedResult<User[]>();
      let queryString = '?';
      if(page != null && itemsPerPage != null)
      {
        queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
      }

      if(likesParams === 'Likers')
      {
        queryString += 'Likers=true&';
      }
      if(likesParams === 'Likees')
      {
          queryString += 'Likees=true&';
      }

      if(userParams != null){
        queryString += 
              'minAge=' + userParams.minAge +
              '&maxAge=' + userParams.maxAge +
              '&gender=' + userParams.gender + 
              '&orderBy=' + userParams.orderBy;
      }

      return this.http.get(this.baseUrl + 'user' + queryString ,this.jwt())
      .pipe(
      map( (resposne: Response) => { 
        paginatedResult.result = resposne.json();
        if(resposne.headers.get("Pagination") != null)
        {
          paginatedResult.pagination = JSON.parse(resposne.headers.get('Pagination'));
        }
        return paginatedResult;
      })
      )
      .pipe(catchError(this.handleError));
      
    }


    GetUser(id:number): Observable<User>
    {
        return this.http.get(this.baseUrl + 'user/' + id,this.jwt())
        .pipe(map(response => <User>response.json()))
        .pipe(catchError(this.handleError));
    }

    updateUser(id: number, user: User)
    {
        return this.http.put(this.baseUrl + 'user/' + id,user,this.jwt()).pipe(catchError(this.handleError));
    }

    SendLike(id: number, recipientId: number)
    {
      return this.http.post(this.baseUrl + 'user/' + id + '/Like/' + recipientId , this.jwt()).catch(this.handleError);
    }

    getMessages(id: number,page?: number, itemsPerPage?: number, messageContainer?: string)
    {
      const pagintedResult: PagintedResult<Message[]> = new PagintedResult<Message[]>();
      let querstring = '?MessageContainer=' + messageContainer;
      if(page != null && itemsPerPage != null)
      {
        querstring += '&pageNumber=' + page + '&pageSize=' + itemsPerPage;
      }

      return this.http.get(this.baseUrl + 'users/' + id + '/messages' + querstring,this.jwt())
          .pipe(map( (response: Response) => {
              pagintedResult.result = response.json();
              if(response.headers.get('Pagination') != null){
                pagintedResult.pagination = JSON.parse(response.headers.get('Pagination'));
              }
              return pagintedResult;
            })).pipe(catchError(this.handleError));
    }

    getMessageThread(id: number, recipientId: number){
       return this.http.get(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId,this.jwt())
          .pipe(map( (res: Response ) => {
            return res.json();
          })).pipe(catchError(this.handleError));
    }

    sendMessage(id: number, message: Message){
      return this.http.post(this.baseUrl + 'users/' + id + '/messages' ,message,this.jwt())
      .pipe(map( (res: Response) => {
        return res.json();
      })).pipe(catchError(this.handleError));
    }

    private jwt()
    {
        let headers;
        let token = localStorage.getItem('token');
        if(token)
        {
            headers = new Headers({'Authorization': 'Bearer ' + token});
            headers.append('Content-type', 'application/json');
        }
        return new RequestOptions({headers: headers});
    }

    private handleError(error : any)
  {
      if(error.status === 400){
        return Observable.throw(error._body);
      }
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
