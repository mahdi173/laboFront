import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Besoin} from "../model/besoin";
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BesoinService {

  private besoinsUrl:string;

  constructor(private http:HttpClient) {
    this.besoinsUrl = 'http://localhost:8099/besoins';
   }

   public getBesoins(): Observable<Besoin[]> {
    return this.http.get<Besoin[]>(this.besoinsUrl+'/index').pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }
  public save(b:Besoin): Observable<any> {
    return this.http.post<any>(this.besoinsUrl+'/create', b).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public update(b:Besoin): Observable<any> {
    return this.http.put<any>(this.besoinsUrl+'/edit', b).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public delete(b:Besoin): Observable<any> {
    return this.http.post<any>(this.besoinsUrl+'/delete', b).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

}
