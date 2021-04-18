import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UserClass } from 'src/app/model/user.class';
import { UserService } from 'src/app/rest';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:UserClass[] = new Array();
  constructor(private userService:UserService) { }

  ngOnInit() 
  {
    
    this.userService.userList().subscribe
    (
      res =>
      {
        this.users = res.users;
      }
    );
    
    /*this.users.push({user_id:1,name:'test', age:20, email:'Test', password:'test'});
    this.users.push({user_id:1,name:'test', age:20, email:'Test', password:'test'});*/

  }

}
