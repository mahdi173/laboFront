import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Admin} from "../model/admin";
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private adminsUrl:string;

  constructor(private http:HttpClient) {
    this.adminsUrl = 'http://localhost:8099/admins';
   }


  public save(admin:Admin): Observable<any> {
    return this.http.post<any>(this.adminsUrl+'/create', admin).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public update(admin:Admin): Observable<any> {
    return this.http.put<any>(this.adminsUrl+'/edit', admin).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
  
  public delete(admin:Admin): Observable<any> {
    return this.http.post<any>(this.adminsUrl+'/delete', admin).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

}
