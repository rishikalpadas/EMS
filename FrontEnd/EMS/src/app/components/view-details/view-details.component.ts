
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';



@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit{

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
  constructor(private route: ActivatedRoute, private employeeService: EmployeesService){

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

}

