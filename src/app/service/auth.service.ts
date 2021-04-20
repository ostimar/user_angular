import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable, Subject, throwError} from "rxjs";
import {tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminService } from '../rest';
import { UserVolatileService } from './user-volatile.service';
@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private adminService: AdminService,private userVolatileService: UserVolatileService,
    private helper: JwtHelperService,
    private router: Router) { }

  login(username: string, password: string):Observable<any>
    {
      return this.adminService.loginGet(username, password).pipe
      (
        tap((result) => this.save_token(result)),
      )         

  }


  private save_token(res) {
      if (res.user) {
          localStorage.setItem('id_token', res.authToken);
          localStorage.setItem('user', JSON.stringify(res.user));
          return;
      }else
      {
        throwError(res);
      }

  }
  logout()
  {
    if(environment.PERSISTENT)
    {
      localStorage.removeItem("id_token");
      localStorage.removeItem("user");
    }else
    {
      this.userVolatileService.logout();
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if(!environment.PERSISTENT)
      return this.userVolatileService.isAuthenticated;
    if( localStorage.getItem("id_token") == null || this.helper.isTokenExpired(localStorage.getItem("id_token")))
        return false;
     return true;
  };


  getCurrentUser()
  {
    return JSON.parse(localStorage.getItem("user"));
  }


 
}
