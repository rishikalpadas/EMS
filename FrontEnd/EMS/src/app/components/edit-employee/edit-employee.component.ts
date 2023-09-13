import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit{

  employeeDetails : Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    dob: '',
    address: '',
    degree: '',
    specialization: '',
    skills: '',
    designation: '',
    salary: 0,
  }
  constructor(private route: ActivatedRoute, private employeeService: EmployeesService, private router: Router, private toast: NgToastService){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');

        if (id){

          this.employeeService.getEmployee(id)
          .subscribe({
            next: (response)=>{
              this.employeeDetails = response;
            }
          })

        }
      }
    })
  }

  updateEmployee(){
    this.employeeService.updateEmployee(this.employeeDetails.id,this.employeeDetails)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['dashboard'])
        this.toast.success({detail:"SUCCESS",summary:"Employee Details Updated !!", duration:5000})
      }
    });


  }

  deleteEmployee(id:string){
    this.employeeService.deleteEmployee(id)
    .subscribe({
      next:(response)=>{
        this.router.navigate(['dashboard']);
      }
    })
  }
}
