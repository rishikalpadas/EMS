import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path:'signup',component: SignupComponent},
  {path:'dashboard',component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'add-employee',component:AddEmployeeComponent},
  {path:'employees/edit/:id',component:EditEmployeeComponent},
  {path:'employees/details/:id',component:ViewDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
