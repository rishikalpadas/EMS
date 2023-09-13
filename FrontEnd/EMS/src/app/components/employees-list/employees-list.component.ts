import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit{
  employees: Employee[] = [];
  public role!: string;
  public fullName : string = "";

  constructor(private employeesService: EmployeesService,private api: ApiService, private userStore: UserStoreService,private auth: AuthService, private router: Router){ }

  ngOnInit(): void {
    this.employeesService.getAllEmployees()
    .subscribe({
      next: (employees) =>{
        this.employees = employees;
      },
      error: (response) =>{
        console.log(response);
      }
    });
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    })

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

 
  }




