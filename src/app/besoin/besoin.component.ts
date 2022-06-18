import { Component, OnInit } from '@angular/core';
import {Besoin} from "../model/besoin";
import {Membre} from "../model/membre";
import { BesoinService } from '../service/besoin.service';
import {  Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {User} from "../model/user";

@Component({
  selector: 'app-besoin',
  templateUrl: './besoin.component.html',
  styleUrls: ['./besoin.component.css']
})
export class BesoinComponent implements OnInit {

  title = 'Besoins';
  besoins: Besoin[];
  msg="";
  isOpen= false;
  editMode=false;
  besoin = new Besoin();
  m= new Membre(); // where to put current membre => associate it witht his besoin
  user:any;

  constructor(private service: BesoinService, private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.service.getBesoins().subscribe(
      data => {
        this.besoins = data;
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
    );
    this.user=this.auth.getUserValue();


  }
  openModal():void{
    this.isOpen = true;
  }
  save(): void {
    this.m.id=this.user.id;
    this.besoin.membre=this.m;
    this.besoin.status="En cours de traitement";
    this.service.save(this.besoin).subscribe(
      (response) => {   
        window.location.reload();
        //Next callback
       //this.router.navigate(['/']);  
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
     );

  }
  update():void {
   //the same
    this.service.update(this.besoin).subscribe(
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
  edit(b:Besoin){
    this.besoin = b;
    this.editMode = true;
    this.openModal();

  }
  accepter(b:Besoin){
    this.besoin = b;

    this.besoin.status="Accepter";
    
    this.service.update(this.besoin).subscribe(
      (response) => {                           //Next callback
        console.log('ok')
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
     );
    
  }
  refuser(b:Besoin){
    this.besoin = b;
    this.besoin.status="Refuser";
    
    this.service.update(this.besoin).subscribe(
      (response) => {                           //Next callback
        console.log('ok')
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
     );

  }

  closeModal():void{
    this.isOpen = false;
    this.editMode = false;
  }

  delete(b:Besoin)  {
    if(confirm("Are you sure to delete this besoin? ")) {
      this.service.delete(b).subscribe(
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
