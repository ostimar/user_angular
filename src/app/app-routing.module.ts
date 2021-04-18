import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { AuthGuardService } from './service/auth-guard.service';
import { LoginComponent } from './views/login/login.component';
import { UserAddComponent } from './views/user-add/user-add.component';
import { UserListComponent } from './views/user-list/user-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
    },
    {
      path: '',
      component: DefaultLayoutComponent,
      children:
      [
        {
          path: 'list',
          component: UserListComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'add',
          component: UserAddComponent,
          canActivate: [AuthGuardService]
        }
      ]

    }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
