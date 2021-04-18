import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserClass } from 'src/app/model/user.class';
import * as crypto from 'crypto-js'; 
import { UserService } from 'src/app/rest';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  submit:boolean=false;
  message:string;
  error:string;
  userForm: FormGroup;
  hide:boolean= true;
  hideConfirm:boolean= true;
  constructor(public fb: FormBuilder, private userService: UserService) { }

  submitForm()
  {
    if(this.userForm.valid)
    {
      this.submit = true;
      this.error = undefined;
      this.message = undefined;
      var user:UserClass = new UserClass(this.userForm.value.name, crypto.SHA512(this.userForm.value.password).toString(), this.userForm.value.email, this.userForm.value.age);
      this.userService.userPost(user).subscribe(
      
        (res) => {
          this.message = "Usuario dado de alta correctamente";
        },

        (err) => {
          this.submit = false;        
          if(err.status == 409)
          {
            this.error = "El email ya existe";
          }else
          {
            this.error = "Error";
          }
        }
      );
    }
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


  ngOnInit() {
    this.reactiveForm();
  }

}




