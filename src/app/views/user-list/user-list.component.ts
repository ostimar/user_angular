import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UserClass } from 'src/app/model/user.class';
import { UserService } from 'src/app/rest';
import { UserVolatileService } from 'src/app/service/user-volatile.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:UserClass[] = new Array();
  constructor(private userService:UserService,
    private userVolatileService: UserVolatileService) { }

  ngOnInit() 
  {
    if(environment.PERSISTENT)
    {
      this.userService.userList().subscribe
      (
        res =>
        {
          this.users = res.users;
        }
      );
    }else
    {
      this.userVolatileService.userList().subscribe
      (
        res =>
        {
          this.users = res;
        }
      );
    }
      

  }

}
