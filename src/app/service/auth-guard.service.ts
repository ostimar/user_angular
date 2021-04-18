import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.isAuthenticated()) {
        console.log('No estás logueado');
        this.router.navigate(['/login']);
        return false;
    }
    console.log("logueado")

    return true;
}
}
