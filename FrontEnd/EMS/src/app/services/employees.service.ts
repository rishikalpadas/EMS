import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private baseUrl: string = "https://localhost:7190";
  constructor(private http:HttpClient) { }

  getAllEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl+'/api/employees');
  }

  addEmployee(addEmployeeRequest: Employee): Observable<Employee>{
    addEmployeeRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>(this.baseUrl+'/api/employees',addEmployeeRequest);
  }

  getEmployee(id: string): Observable<Employee>{
    return this.http.get<Employee>(this.baseUrl+'/api/employees/' + id)
  }

  updateEmployee(id:string, updateEmployeeRequest: Employee): Observable<Employee>{
    return this.http.put<Employee>(this.baseUrl+'/api/employees/' + id, updateEmployeeRequest);
  }

  deleteEmployee(id:string):Observable<Employee>{
    return this.http.delete<Employee>(this.baseUrl+'/api/employees/' + id)
  }
}
