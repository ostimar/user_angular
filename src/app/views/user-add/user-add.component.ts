import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  message:string;
  error:string;
  userForm: FormGroup;

  constructor(public fb: FormBuilder) { }

  submitForm(){}

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  reactiveForm() {
    this.userForm = this.fb.group({
      age: new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    })

  }
  ngOnInit() {
    this.reactiveForm();
  }

}
