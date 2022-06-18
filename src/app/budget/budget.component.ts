import { Component, OnInit } from '@angular/core';
import {Budget} from "../model/budget";
import {Labo} from "../model/labo";

import { BudgetService } from '../service/budget.service';
import { LaboService } from '../service/labo.service';
import {  Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {User} from "../model/user";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  title = 'Budgets';
  budgets: Budget[];
  msg="";
  isOpen= false;
  editMode=false;
  budget = new Budget();
  labs:Labo[];
  l= new Labo();
  lab_id=0;
  user= new User();

  constructor(private service:BudgetService, private serviceLabs:LaboService,private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.service.getBudgets().subscribe(
      data => {
        this.budgets = data;
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.msg="Error";
        throw error;
      }
    );

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
    this.user=this.auth.getUserValue();
    this.lab_id=1;


  }
  openModal():void{
    this.isOpen = true;
  }
  save(): void {
    this.l=this.labs[this.lab_id-1];
    this.budget.labo=this.l;
    this.service.save(this.budget).subscribe(
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
    this.l=this.labs[this.lab_id-1];
    this.budget.labo=this.l;
    this.service.update(this.budget).subscribe(
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
  edit(b:Budget){
    this.budget = b;
    this.editMode = true;
    this.openModal();

  }

  closeModal():void{
    this.isOpen = false;
    this.editMode = false;
  }

  delete(b:Budget)  {
    if(confirm("Are you sure to delete this membre? ")) {
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
