import { Component, OnInit, ViewChild  } from '@angular/core';
import { UserClass } from 'src/app/model/user.class';
import { UserService } from 'src/app/rest';
import { UserVolatileService } from 'src/app/service/user-volatile.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {
  col_users: string[] = ['name', 'email', 'age'];
  users:UserClass[] = new Array();
  dataSource = null;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService:UserService,
    private userVolatileService: UserVolatileService) { }

  
  initTable(users:UserClass[])
  {
    this.dataSource = new MatTableDataSource<UserClass>(users);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() 
  {
    if(environment.PERSISTENT)
    {
      this.userService.userList().subscribe
      (
        res =>
        {
         this.initTable(res.users);         
        }
      );
    }else
    {
      this.userVolatileService.userList().subscribe
      (
        res =>
        {
          this.initTable(res); 
        }
      );
    }
  }

}
