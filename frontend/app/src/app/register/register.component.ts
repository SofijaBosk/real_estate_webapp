import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService , private http:HttpClient, private ruter:Router) { }
  
  ngOnInit(): void {
    this.form=new FormGroup({
      name:new FormControl(null,{
        validators:[Validators.required],
      }),
      surname:new FormControl(null,{
        validators:[Validators.required],
      }),
      picture:new FormControl(null),
      username:new FormControl(null,{
        validators:[Validators.required],
      }),
      password:new FormControl(null,{
        validators:[Validators.required],
      }),
      password2:new FormControl(null,{
        validators:[Validators.required],
      }),
      mail:new FormControl('',
        Validators.compose([Validators.required,Validators.pattern(this.pat)]),
      ),
      city:new FormControl(null,{
        validators:[Validators.required],
      }),
      country:new FormControl(null,{
        validators:[Validators.required],
      }),
      type:new FormControl('3',{
        validators:[Validators.required],
      })
      
    })
    this.re=new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.com$/); ///^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // this.re2=new RegExp("");
    
  }
  form:FormGroup;
  pattern:PatternValidator;
  pat:string;
  message:string;
  re:RegExp;
  re2:RegExp;
  
  register(){

    if(!(this.form.get('name').value && this.form.get('surname').value && this.form.get('username').value && this.form.get('password').value && this.form.get('mail').value && this.form.get('city').value&& this.form.get('country').value && this.form.get('type').value)){
      this.message='Unesite sva obavezna polja';
    }
      
    else if(!this.re.test(this.form.get('mail').value)){
      this.message='Email los';
    }
    else if(!(this.form.get('password2').value===this.form.get('password').value)){
      this.message='Pogresna lozinka';
    }
    else{
      this.userService.dohvatiKorisnika(this.form.get('username').value).subscribe((user:User)=>{
        console.log(user);
        if(user!=null) {this.message='Korisnik sa korisnickim imenom '+this.form.get('username').value+' vec postoji';}
        else{

            this.userService.dohvatiEmail(this.form.get('mail').value).subscribe((user:User)=>{
              console.log(user);
              if(user!=null) {this.message='Korisnik sa emailom '+this.form.get('mail').value+' vec postoji';}
              else{
                let slika=this.form.get('picture').value; //SACUVAJ OVU SLIKU U SISTEM A AKO NISTA NISU IZABRALI ONDA "assets/og.png"   
                if(slika==null) slika="";        
                this.userService.register(this.form.get('name').value,this.form.get('surname').value,slika,this.form.get('username').value,this.form.get('password').value,this.form.get('mail').value,this.form.get('city').value,this.form.get('country').value,this.form.get('type').value).subscribe(response=>{     
                  console.log(response.poruka);
                })
                this.message='Uspesno registrovanje';
                alert(this.message);
                this.ruter.navigate(['']);
              }
            });
        }
      
      })
      
      
    }
  }

  selectedFile:null;
  dodataSlika(event:Event){

    if(event.target){
      const target=event.target as HTMLInputElement;
      const files=target.files as FileList;
      const file=files[0];
      this.form.get('picture').patchValue(file);
    }
  }

}
