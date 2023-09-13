import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  type: string = "password"
  isText: boolean = false
  eyeIcon: string = "fa-eye-slash"
  signupForm!: FormGroup
  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService){ }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignup(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value)
      //Send obj to database
      this.auth.signUp(this.signupForm.value)
      .subscribe({
        next:(res =>{
          // alert(res.message);
          this.toast.success({detail:"SUCCESS",summary:res.message, duration: 5000});
          this.signupForm.reset();
          this.router.navigate(['login']);
        }),
        error: (err_res) => {
          alert(err_res?.error.message)
          // console.log(err_res);
          // this.toast.error({ detail: "ERROR", summary: err_res?.error.message, duration: 5000 });
        }
        
        
      });
    }else{
      //throw the error using toaster and with required fields
      // console.log("form is not valid")
      ValidateForm.validateAllFormFields(this.signupForm);
      // alert("Your form is invalid");
      this.toast.info({detail:"INFO",summary:"Missing Details!", duration: 5000});

    }
  }


}
