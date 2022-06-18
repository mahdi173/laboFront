import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {User} from "../model/user";
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http:HttpClient) {    
    this.usersUrl = 'http://localhost:8099/users';
  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl+'/index').pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }
  public delete(u:User): Observable<any> {
    return this.http.post<any>(this.usersUrl+'/delete', u).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
}
