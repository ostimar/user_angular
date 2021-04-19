import { Injectable } from '@angular/core';
import { Observable, of, scheduled, throwError } from 'rxjs';
import { UserClass } from '../model/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserVolatileService {

 constructor() { }
 static USERS_ARRAY:string = 'users-array';
 isAuthenticated:boolean = false;
 
 public initUsers()
 { 
  if(sessionStorage.getItem(UserVolatileService.USERS_ARRAY) == null)
  {
    var users:UserClass[] = new Array();
    users.push(new UserClass("adminvola", "12341234","adminvola@admin.com",20)) ;
    sessionStorage.setItem(UserVolatileService.USERS_ARRAY, JSON.stringify(users)); 
  }
 }

 public add(user:UserClass):Observable<UserClass>
 {
   if(this.get(user.email)  != undefined)
       return throwError("409");
    var users = JSON.parse(sessionStorage.getItem(UserVolatileService.USERS_ARRAY));
    users.push(user);
    sessionStorage.setItem(UserVolatileService.USERS_ARRAY, JSON.stringify(users));
    return of(user);     
 };

 public userList():Observable<UserClass[]>
 {
    return of(JSON.parse(sessionStorage.getItem(UserVolatileService.USERS_ARRAY)));
 }
 
 public get(email:string)
 {
    var users:UserClass[] = JSON.parse(sessionStorage.getItem(UserVolatileService.USERS_ARRAY));
    return users.find(user => user.email.toUpperCase() === email.toUpperCase());
  }

  public login(email:string, password:string): Observable<UserClass>
  {
    var user:UserClass = this.get(email);
    if(user === undefined)
      return throwError("404");
    if(user.password !== password)
       return throwError("403");
    this.isAuthenticated = true;
    return of(user);
  }

  public logout()
  {
    this.isAuthenticated = false;
  }
}
