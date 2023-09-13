import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit{
  formValue !: FormGroup;
  addEmployeeRequest: Employee = {
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
  constructor(private employeeService: EmployeesService, private router: Router, private toast: NgToastService, private formbuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
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
    })
  }

  addEmployee(){
    this.employeeService.addEmployee(this.addEmployeeRequest)
    .subscribe({
      next:(employee) =>{
        console.log(employee);
        this.router.navigate(['dashboard'])
        this.toast.success({detail:"SUCCESS",summary:"Employee Added !!", duration:5000})
      }
    });
  }
}
