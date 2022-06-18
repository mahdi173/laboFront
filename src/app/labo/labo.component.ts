import { Component, OnInit } from '@angular/core';
import {Labo} from "../model/labo";
import {Responsable} from "../model/responsable";
import { LaboService } from '../service/labo.service';
import { ResponsableService } from '../service/responsable.service';
import {  Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {User} from "../model/user";

@Component({
  selector: 'app-labo',
  templateUrl: './labo.component.html',
  styleUrls: ['./labo.component.css']
})
export class LaboComponent implements OnInit {

  title = 'Labo';
  labs: Labo[];
  msg="";
  isOpen=false;
  editMode=false;
  labo = new Labo();
  respos:Responsable[];
  r= new Responsable();
  respo_id=0;
  user= new User();


  constructor(private service: LaboService, private serviceRespo :ResponsableService, private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.service.getLabs().subscribe(
      data => {
        this.labs = data;
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
    );

    this.serviceRespo.getRespos().subscribe(
      data => {
        this.respos = data;
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
    );
    this.user=this.auth.getUserValue();
    this.respo_id=1;
  }
  openModal():void{
    this.isOpen = true;
  }
  save(): void {
    this.r=this.respos[this.respo_id];
    this.labo.respo=this.r;
    this.service.saveLabo(this.labo).subscribe(
      (response) => {                           //Next callback
        window.location.reload();
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
     );

  }
  update():void {
    this.r=this.respos[this.respo_id];
    this.labo.respo=this.r
    this.service.updateLabo(this.labo).subscribe(
      (response) => {                           //Next callback
        window.location.reload();
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
     );

  }
  edit(l:Labo){
    this.labo = l;
    this.editMode = true;
    this.openModal();

  }

  closeModal():void{
    this.isOpen = false;
    this.editMode = false;
  }

  delete(l:Labo)  {
    if(confirm("Are you sure to delete this lab? ")) {
      this.service.deleteLabo(l).subscribe(
        (response) => {        
         //this.router.navigate(['']);
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
