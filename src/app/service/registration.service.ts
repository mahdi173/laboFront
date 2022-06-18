import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {User} from "../model/user";
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private usersUrl: string;
  u= new User();

  constructor(private http:HttpClient, private auth:AuthService,   private router: Router,) { 
    this.usersUrl = 'http://localhost:8099/users';

  }

  
  public loginUser(user:User): Observable<User> {
    return this.http.post<User>(this.usersUrl+'/login', user).pipe(
      map(user => {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('user', JSON.stringify(user));
         this.auth.getUserSubject().next(user);
         return user;
      })
    );
  }
  public registreUser(user:User): Observable<any> {
    return this.http.post<any>(this.usersUrl+'/signup', user).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
  public logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.auth.getUserSubject().next(this.u);
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }

}