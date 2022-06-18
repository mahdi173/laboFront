import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {  Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
   user = new User();
   msg='';

  constructor(private registre: RegistrationService, private router: Router) { }

  ngOnInit(): void {
  }
  registreUser(){
    this.registre.registreUser(this.user).subscribe(
      (response) => {                           //Next callback
        this.router.navigate(['/login']);       
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
     );
  }

}
