import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {User} from "../model/user";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  title = 'Gestion Labo';
  user= new User();
  constructor(private auth:AuthService ) { }

  ngOnInit(): void {
   // this.user=this.auth.getUserValue();
   //console.log(this.user);
  }

 
}
