import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private userService:UserService, private ruter:Router) { }

  ngOnInit(): void {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
  }
  currentUser:User;
  oldPassword:string;
  newPassword:string;
  potvrda:string;
  poruka:string;

  change(){
    if(this.currentUser.password===this.oldPassword && this.potvrda===this.newPassword){
      this.poruka=''; this.userService.changePassword(this.currentUser,this.newPassword).subscribe(response=>{     
      console.log(response.poruka);
      if(response.poruka==='Korisnik uspesno azuriran') {
        alert("Uspesno promenjena lozinka");
        localStorage.removeItem('currentUser');
        this.ruter.navigate(['']);
      }
    });
      // this.currentUser.password=this.newPassword;
      // localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
    }
    else this.poruka="pogresna lozinka";
  }
}
