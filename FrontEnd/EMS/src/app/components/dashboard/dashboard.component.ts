import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from 'src/app/models/employee.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public users: any = [];
  public role!: string;
  public fullName : string = "";


 
  
  constructor(private auth: AuthService,private api: ApiService, private userStore: UserStoreService,private employeeService: EmployeesService,private router: Router,private toast: NgToastService){}
  ngOnInit(): void {

    this.api.getUsers()
    .subscribe(res=>{
      this.users = res;
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

  logout(){
    this.auth.signOut();
  }

   
  
}
