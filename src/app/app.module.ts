import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './views/user-list/user-list.component';
import { UserAddComponent } from './views/user-add/user-add.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultLayoutComponent,
    UserListComponent,
    UserAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
