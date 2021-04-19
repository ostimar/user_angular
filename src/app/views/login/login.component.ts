import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/rest';
import * as crypto from 'crypto-js'; 
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserVolatileService } from 'src/app/service/user-volatile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:string;
  loginForm:FormGroup;
  errorSistema:boolean=false;
  hide = true;
  
  constructor(public fb: FormBuilder, public adminService:AdminService
    ,private router:Router, private authService: AuthService, private userVolatileService:UserVolatileService) { }

  submitForm(){
     if(this.loginForm.valid)
     {       
      this.error = null;
      this.errorSistema = false;
      if(environment.PERSISTENT)
       this.submitFormP();
      else
       this.submitFormV();
      }
     
  };

  submitFormP()
  {
    this.authService.login(this.loginForm.value.email, 
      crypto.SHA512(this.loginForm.value.password).toString()).subscribe
    (
        (res) => {
          console.log(this.authService.isAuthenticated());
          this.router.navigate(['/list']); 
        },
      (err) => {
          switch(err.status)
          {
            case 404:
              this.loginForm.controls['email'].setErrors({'Email incorrecto': true});
              break;
            case 403:
              this.loginForm.controls['password'].setErrors({'Password incorrecto': true}); 
              break;
            default:
              this.errorSistema = true;
              break;
          } 
          this.error = err.status;
      }
      );
  }

  submitFormV()
  {
    this.userVolatileService.login(this.loginForm.value.email, 
      this.loginForm.value.password).subscribe
    (
        (res) => {
          this.router.navigate(['/list']); 
        },
      (err) => {
          switch(err)
          {
            case '404':
              this.loginForm.controls['email'].setErrors({'Email incorrecto': true});
              break;
            case '403':
              this.loginForm.controls['password'].setErrors({'Password incorrecto': true}); 
              break;
            default:
              this.errorSistema = true;
              break;
          } 
          this.error = err.status;
      }
      );
  }



  reactiveForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    })
  }

  ngOnInit() {
    this.userVolatileService.initUsers();
    this.reactiveForm();
  }

}
