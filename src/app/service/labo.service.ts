import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Labo} from "../model/labo";
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LaboService {

  private labsUrl: string;

  constructor(private http:HttpClient) {    
    this.labsUrl = 'http://localhost:8099/laboratoires';
  }
  public getLabs(): Observable<Labo[]> {
    return this.http.get<Labo[]>(this.labsUrl+'/index').pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }
  public getRespoLabs(): Observable<Labo[]> {
    return this.http.get<Labo[]>(this.labsUrl+'/index').pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }

    public saveLabo(labo:Labo): Observable<any> {
      return this.http.post<any>(this.labsUrl+'/create', labo).pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);
          return throwError(err);
        })
      );
    }
  
    public updateLabo(labo:Labo): Observable<any> {
      return this.http.put<any>(this.labsUrl+'/edit', labo).pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);
          return throwError(err);
        })
      );
    }
  
    public deleteLabo(labo:Labo): Observable<any> {
      return this.http.post<any>(this.labsUrl+'/delete', labo).pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);
          return throwError(err);
        })
      );
    }
  

}
