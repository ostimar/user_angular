import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserClass } from 'src/app/model/user.class';
import * as crypto from 'crypto-js'; 
import { UserService } from 'src/app/rest';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserVolatileService } from 'src/app/service/user-volatile.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  submmitOK:string;
  error:string;
  userForm: FormGroup;
  hide:boolean= true;
  hideConfirm:boolean= true;
  constructor(public fb: FormBuilder
    , private userService: UserService
    , private router: Router
    , private userVolatileService: UserVolatileService) { }

  submitForm()
  {
    if(this.userForm.valid)
    {
      this.error = undefined;
      this.submmitOK = undefined;
      if(environment.PERSISTENT)
         this.submitP();
      else
        this.submitV();      
    }
  }

  submitP()
  {
    var user:UserClass = new UserClass(this.userForm.value.name, crypto.SHA512(this.userForm.value.password).toString(), this.userForm.value.email, this.userForm.value.age);
    this.userService.userPost(user).subscribe(      
      (res) => {
        this.submmitOK = "Usuario dado de alta correctamente";
      },

      (err) => {
        if(err.status == 409)
        {
          this.error = "El email ya existe";
          this.userForm.controls['email'].setErrors({'El email ya existe': true}); 
        }else
        {
          this.error = "Error";
        }
      }
    );
  }

  submitV()
  {
    var user:UserClass = new UserClass(this.userForm.value.name, this.userForm.value.password, this.userForm.value.email, this.userForm.value.age);
    this.userVolatileService.add(user).subscribe(      
      (res) => {
        this.submmitOK = "Usuario dado de alta correctamente";
      },

      (err) => {
        if(err == 409)
        {
          this.error = "El email ya existe";
          this.userForm.controls['email'].setErrors({'El email ya existe': true}); 
        }else
        {
          this.error = "Error";
        }
      }
    );
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  
  reactiveForm() {
    this.userForm = this.fb.group({
      age: new FormControl('',[Validators.required, Validators.min(1), Validators.max(200)]),
      name: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      confirm: new FormControl('',[Validators.required, Validators.minLength(8), this.passwordMatch]),
    })
  }

  passwordMatch(control: AbstractControl){
    let paswd = control.root.get('password');
    if(paswd && control.value != paswd.value){
     return {
         passwordMatch: true
     };   
    }
    return null;
}


  reload()
  {
    window.location.reload();
  }
  ngOnInit() {
    this.reactiveForm();
  }

}




