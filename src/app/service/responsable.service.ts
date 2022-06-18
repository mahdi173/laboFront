import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Responsable} from "../model/responsable";
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  private resposUrl: string;

  constructor(private http:HttpClient) { 
    this.resposUrl = 'http://localhost:8099/respos';
  }

  public getRespos(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(this.resposUrl+'/index').pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  public save(r:Responsable): Observable<any> {
    return this.http.post<any>(this.resposUrl+'/create', r).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public update(r:Responsable): Observable<any> {
    return this.http.put<any>(this.resposUrl+'/edit', r).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public delete(r:Responsable): Observable<any> {
    return this.http.post<any>(this.resposUrl+'/delete', r).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

}
