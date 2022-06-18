import { Component, OnInit } from '@angular/core';
import {Membre} from "../model/membre";
import {Labo} from "../model/labo";
import { MembreServiceService } from '../service/membre-service.service';
import { LaboService } from '../service/labo.service';
import { BudgetService } from '../service/budget.service';

import {  Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {User} from "../model/user";
import {Budget} from "../model/budget";

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {
  title = 'Membres';
  membres: Membre[];
  msg="";
  isOpen= false;
  editMode=false;
  user = new Membre();
  labs:Labo[];
  l= new Labo();
  lab_id=0;
  u= new User();
  currentBudget= new Budget();
  currentYear = new Date().getFullYear();

  constructor(private service: MembreServiceService, private serviceLabs:LaboService, 
    private auth:AuthService,private router: Router, private budgetService:BudgetService) { }

  ngOnInit(): void {
    //this.currentBudget=this.budgetService.getThisYearBudget(this.currentYear);
    this.budgetService.getThisYearBudget(this.currentYear).subscribe(
      data => {
        this.currentBudget=data;
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
    );;
    this.service.getMembres().subscribe(
      data => {
        this.membres = data;
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
    );
    //should return only the lab of the current respo
    this.serviceLabs.getRespoLabs().subscribe(
      data => {
        this.labs = data;
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
    );
    this.u=this.auth.getUserValue();
    this.lab_id=1;
  }
  openModal():void{
    this.isOpen = true;
  }
  save(): void {
    this.l=this.labs[this.lab_id-1];
    this.user.labo=this.l;

    this.currentBudget.dotationRecherche=this.currentBudget.dotationRecherche-this.user.budget;

    this.budgetService.update(this.currentBudget).subscribe(
      (response) => { 
      
        this.service.saveMembre(this.user).subscribe(
          (response) => {                           //Next callback
            window.location.reload();
          },
          (error) => {                              //Error callback
            console.error('error caught in component')
            this.msg="Error";
            throw error;
          }
         );
                                   //Next callback
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
     );

   

  }
  update():void {
    this.l=this.labs[this.lab_id-1];
    this.user.labo=this.l;
    this.service.updateMembre(this.user).subscribe(
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
  edit(m:Membre){
    this.user = m;
    this.editMode = true;
    this.openModal();

  }

  closeModal():void{
    this.isOpen = false;
    this.editMode = false;
  }

  delete(m:Membre)  {
    if(confirm("Are you sure to delete this membre? ")) {
      this.service.deleteMembre(m).subscribe(
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
