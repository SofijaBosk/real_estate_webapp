import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';   
}


@Injectable()
export class OnlyAdminUsersGuard implements CanActivate{

  constructor(private userService:UserService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    if(this.userService.LoggedInAdmin()){
      return true;
    }
    else{
      window.alert("Nemate prava da vidite ovu stranicu");
      return false;
    }
  }
 
}

@Injectable()
export class OnlyRegularUsersGuard implements CanActivate{

  constructor(private userService:UserService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    if(this.userService.LoggedInUser()){
      return true;
    }
    else{
      window.alert("Nemate prava da vidite ovu stranicu");
      return false;
    }
  }
 
}


@Injectable()
export class OnlyAgentUsersGuard implements CanActivate{

  constructor(private userService:UserService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    if(this.userService.LoggedInAgent()){
      return true;
    }
    else{
      window.alert("Nemate prava da vidite ovu stranicu");
      return false;
    }
  }
 
}

@Injectable()
export class OnlyUsersLGuard implements CanActivate{

  constructor(private userService:UserService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    if(this.userService.LoggedInAnyUser()){
      return true;
    }
    else{
      window.alert("Nemate prava da vidite ovu stranicu");
      return false;
    }
  }
 
}