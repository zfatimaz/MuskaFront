import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private rolesAPi: string = "http://localhost:8080/roles";
  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());


  constructor(private http: HttpClient) { }
  setUser(user) {
    console.log('new user', user);
    this.currentUserSubject.next(user);
  }
  public roles(): Observable<{ roles: string[] }> {
    return this.http.get<{ roles: string[] }>(this.rolesAPi);
  }
}
