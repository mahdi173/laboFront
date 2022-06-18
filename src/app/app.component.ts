import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import {User} from "./model/user";
import { RegistrationService } from './service/registration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidebarOpen=true;
  dropdownOpen=false;

  user= new User();
  constructor(private auth:AuthService, private registreService:RegistrationService ) { }

  ngOnInit(): void {
    this.user=this.auth.getUserValue();
   console.log(this.user);
  }

  openCloseDropdown(){
    if(this.dropdownOpen){
      this.dropdownOpen=false;
    }else{
      this.dropdownOpen=true;
    }
  }

  openCloseSidebar(){
    if(this.sidebarOpen){
      this.sidebarOpen=false;
    }else{
      this.sidebarOpen=true;
    }
  }
  logout(){
    this.registreService.logout();
    
  }
}
