import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';
import {User} from "../model/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user= new User();
    msg='';
  constructor(private registre: RegistrationService, private router: Router ) { }

  ngOnInit(): void {
  }
   //this.router.navigate(['/login'])
  loginUser (){
    this.registre.loginUser(this.user).subscribe(
      (response) => {       
        this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
        //Next callback
        //this.router.navigate(['/home']);       
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
      );
  }

}
