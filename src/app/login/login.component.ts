import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { AuthService } from '../service/AuthService';
import { Utilisateur } from '../ecransaisie1/utilisateur';
//import { Ecransaisie1Component } from '/ecransaisie1/ecransaisie1.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser1 = this.userService.currentUser;

  user=new Utilisateur();
  msg='';

  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private router: Router,private authenticationService:AuthenticationService,private authService:AuthService,private userService: AuthService) { }

  ngOnInit(): void {
  }
  setUser() {
    this.userService.setUser(this.currentUser1);
    this.user.nomutilisateur = 'toussant';
    this.user.motdepasse = 'toussant';

  }
  handleLogin(){
    this.authService.login(this.username,this.password).subscribe((result)=>{
      this.invalidLogin= false;
      this.loginSuccess=true;
      this.successMessage='Login Succeful';

    },()=>{
        this.invalidLogin=true;
        this.loginSuccess=false;
    });
  }
  onLogin(){
    //console.log(dataForm.value.username);
    console.log(this.username);
    console.log(this.password);
    this.authenticationService.login(this.username,this.password)
    
    if(this.authenticationService.isAuthenticated){
      console.log("Bonjour");
      this.router.navigateByUrl('/menu');
    }
  }

  onLog(){
      this.authService.loginUserFromRemote(this.user).subscribe(
        data => {
          console.log("response received")
         // this.setUser();
         this.userService.setUser(data);
          this.router.navigateByUrl('/menu');
        },
        error => {
          console.log("exception received")
          this.msg="Bad credentials"
        }
      )
  }

    //handleLogin() {
    //this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
      //this.invalidLogin = false;
      //this.loginSuccess = true;
      //this.successMessage = 'Login Successful.';
      //this.router.navigateByUrl("/menu");
      //this.router.navigate(["/menu"]);
    //}, () => {
      //this.invalidLogin = true;
      //this.loginSuccess = false;
    //});      
  //}


  btnClickK= function () {
    
    //console.log("Navigation has failed!");
    //this.router.navigateByUrl('/ecransaisie1.component.html');
    //this.router.navigateByUrl("/ecransaisie1");
    this.router.navigateByUrl("/menu");
    //this.router.navigate('./ecransaisie1.component.html');
    //this.router.navigate('/Ecransaisie1Componenttt');
    //console.log("BONJOUR"); 
  };

}
