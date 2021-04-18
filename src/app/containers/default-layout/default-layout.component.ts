import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) 
  {
   }
  
  salir()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
  }

}
