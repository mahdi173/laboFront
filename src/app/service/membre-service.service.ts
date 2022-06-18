import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Membre} from "../model/membre";
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembreServiceService {

  private membresUrl: string;

  constructor(private http:HttpClient) {    
    this.membresUrl = 'http://localhost:8099/membres';
  }
  
  public getMembres(): Observable<Membre[]> {
    return this.http.get<Membre[]>(this.membresUrl+'/index').pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  public saveMembre(user:Membre): Observable<any> {
    return this.http.post<any>(this.membresUrl+'/create', user).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public updateMembre(user:Membre): Observable<any> {
    return this.http.put<any>(this.membresUrl+'/edit', user).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public deleteMembre(user:Membre): Observable<any> {
    return this.http.post<any>(this.membresUrl+'/delete', user).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
}
