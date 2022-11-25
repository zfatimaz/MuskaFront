import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Utilisateur } from '../ecransaisie1/utilisateur';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject = new BehaviorSubject<any>({});
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

        public username: string;
        public password: string;
    constructor(private http: HttpClient){
    }
    setUser(user) {
        console.log('new user', user);
        this.currentUserSubject.next(user);
      }
    login(username: string, password: string){
        return this.http.get(`/api/v1/login`,
        {headers:{authorization:this.createBasicAuthToken(username, password)}}).pipe(map((res)=>{
            this.username=username;
            this.password=password;
            this.registerSuccessfulLogin(username, password);
        }));
    }
    createBasicAuthToken(username: string,password: string){
        return 'Basic'+ window.btoa(username + "" + password);
    }
    registerSuccessfulLogin(username,password){
        
    }

    public loginUserFromRemote(user:Utilisateur):Observable<any>{
        return this.http.post<any>("http://localhost:8080/login",user)
    }

    public utilisateurCourant(user:Utilisateur):Observable<any>{
        return this.http.post<any>("http://localhost:8080/login",user)
    }

}