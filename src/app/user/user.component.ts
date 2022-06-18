import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {Responsable} from "../model/responsable";
import {Admin} from "../model/admin";
import { UserService } from '../service/user.service';
import { ResponsableService } from '../service/responsable.service';
import { AdminService } from '../service/admin.service';
import {  Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  title = 'Users';
  users: User[];
  msg="";
  isOpen= false;
  editMode=false;
  user = new User();
  emptyUser = new User();
  respo = new Responsable();
  admin = new Admin();
  loggedUser = new User();
  constructor(private service:UserService, private serviceRespo:ResponsableService,
               private serviceAdmin:AdminService, private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(
      data => {
        this.users = data;
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
    );
    this.loggedUser=this.auth.getUserValue();

  }
  openModal():void{
    this.isOpen = true;
  }
  save(): void {
    if(this.user.profil=="Responsable"){
      this.respo.userName= this.user.userName;
      this.respo.email=this.user.email;
      this.respo.password=this.user.password;
        
      this.serviceRespo.save(this.respo).subscribe(
          (response) => {                           //Next callback
            //console.log('ok')
              window.location.reload();
          },
          (error) => {                              //Error callback
            console.error('error caught in component')
            this.msg="Error";
            throw error;
          }
        );
    }else{
      this.admin=this.user;
      this.serviceAdmin.save(this.admin).subscribe(
        (response) => {                           //Next callback
          //console.log('ok')
          window.location.reload();

        },
        (error) => {                              //Error callback
          console.error('error caught in component')
          this.msg="Error";
          throw error;
        }
      );
    }
  }
  update():void {
    if(this.user.profil=="Responsable"){
      this.respo.userName= this.user.userName;
      this.respo.email=this.user.email;
      this.respo.password=this.user.password;
        
      this.serviceRespo.update(this.respo).subscribe(
          (response) => {  
            this.user = this.emptyUser;
            window.location.reload();


            //console.log('ok')
          },
          (error) => {                              //Error callback
            console.error('error caught in component')
            this.msg="Error";
            throw error;
          }
        );
    }else{
      this.admin=this.user;
      this.serviceAdmin.update(this.admin).subscribe(
        (response) => {    
         this.user = this.emptyUser;
         window.location.reload();

          //console.log('ok')
        },
        (error) => {                              //Error callback
          console.error('error caught in component')
          this.msg="Error";
          throw error;
        }
      );
    }

  }
  edit(user:any){
    this.user = user;
    if(user.profil=="Responsable"){
      this.respo.grade=user.grade;
    }
    this.editMode = true;
    this.openModal();

  }

  closeModal():void{
    this.isOpen = false;
    this.editMode = false;
    this.user = this.emptyUser;

  }

  delete(user:User)  {
    if(confirm("Are you sure to delete this user? ")) {
      if(user.profil=="Responsable"){
        this.respo.id=user.id;
       
        this.serviceRespo.delete( this.respo).subscribe(
            (response) => {                           //Next callback
              //console.log('ok')
              window.location.reload();

            },
            (error) => {                              //Error callback
              console.error('error caught in component')
              this.msg="Error";
              throw error;
            }
          );
      }else{
        this.serviceAdmin.delete(user).subscribe(
          (response) => {                           //Next callback
            //console.log('ok')
            window.location.reload();

          },
          (error) => {                              //Error callback
            console.error('error caught in component')
            this.msg="Error";
            throw error;
          }
        );
      }
    }
  }
}
