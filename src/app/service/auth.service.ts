import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable, Subject, throwError} from "rxjs";
import {tap, catchError } from 'rxjs/operators';
import { AdminService } from '../rest';
@Injectable({
  providedIn: 'root'
})

export class AuthService {



  constructor(private adminService: AdminService,
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
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
  }

  isAuthenticated(): boolean {

    if( localStorage.getItem("id_token") == null || this.helper.isTokenExpired(localStorage.getItem("id_token")))
      return false;

    return true;
  };


  getCurrentUser()
  {
    return JSON.parse(localStorage.getItem("user"));
  }

  isAuthorized(allowedRoles: string[]): boolean {
    /* if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
      }
  
      let user = localStorage.getItem('user');
      if(this.getCurrentUser().rol == null)
        return false;
   
      return allowedRoles.includes(this.getCurrentUser().rol.toString());*/
    return true;

    }
 
}
