import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Budget} from "../model/budget";
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetsUrl: string;

  constructor(private http:HttpClient) {    
    this.budgetsUrl = 'http://localhost:8099/budgets';
  }
  public getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.budgetsUrl+'/index').pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  
  public save(b:Budget): Observable<any> {
    return this.http.post<any>(this.budgetsUrl+'/create', b).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public update(b:Budget): Observable<any> {
    return this.http.put<any>(this.budgetsUrl+'/edit', b).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public delete(b:Budget): Observable<any> {
    return this.http.post<any>(this.budgetsUrl+'/delete', b).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getThisYearBudget(y:number): Observable<Budget> {
    return this.http.get<Budget>(this.budgetsUrl+'/'+y ).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

}
