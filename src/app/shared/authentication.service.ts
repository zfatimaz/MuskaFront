import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users=[
    {username:'admin',password:'1234',roles:['ADMIN','USER']},
    {username:'muska',password:'muska@2021!',roles:['USER']}
  ]
  public isAuthenticated
  public userAuthenticated
  constructor() { }
  public login(username:string,password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username==username && u.password==password){
        user=u;
      }
    })
 
  if(user){
    this.isAuthenticated=true;
    this.userAuthenticated=user;
  }else{
    this.isAuthenticated=false;
    this.userAuthenticated=undefined
  }
}

}
