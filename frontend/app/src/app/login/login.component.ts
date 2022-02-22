import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message:string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      localStorage.setItem('currentUser',JSON.stringify(user));
      if(user){
        if(user.type==1){
          this.router.navigate(["user"]);
        }
        else if(user.type==0){
          this.router.navigate(["admin"]);
        }
        else if(user.type==2){
          this.router.navigate(["worker"]);
        }else{
          this.message='Ovaj korisnik nije jos odobren za rad sa sistemom'
        }
      }
      else{
        this.message='Pogresno korisnicko ime ili lozinka';
        this.router.navigate([""]);
      }
    })
  }

}

