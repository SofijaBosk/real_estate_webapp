import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, OnlyAdminUsersGuard, OnlyAgentUsersGuard, OnlyRegularUsersGuard, OnlyUsersLGuard } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { WorkerComponent } from './worker/worker.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordComponent } from './password/password.component';
import { GuestComponent } from './guest/guest.component';
import { NekretnineComponent } from './nekretnine/nekretnine.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    UserComponent,
    WorkerComponent,
    RegisterComponent,
    PasswordComponent,
    GuestComponent,
    NekretnineComponent,
    NavMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ChartsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  // exports:[MatSidenavModule],
  providers: [OnlyAdminUsersGuard, 
    OnlyRegularUsersGuard,
    OnlyAgentUsersGuard,
    OnlyUsersLGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }


