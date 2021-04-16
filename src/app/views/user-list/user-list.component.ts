import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { user } from 'src/app/rest/model/user';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:user[] = new Array();
  constructor() { }

  ngOnInit() 
  {

    this.users.push({id:1,name:'test', age:20, email:'Test', password:'test'});
    this.users.push({id:1,name:'test', age:20, email:'Test', password:'test'});

  }

}
