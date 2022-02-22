import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Nekretnine } from '../models/nekretnine';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private ruter:Router, private userService:UserService, private nekretnineService:NekretnineService) { }

  ngOnInit(): void { 
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    this.nekretnineService.dohvatiSvePromovisaneNekretnine().subscribe((nekr:Nekretnine[])=>{      
      this.svePromovisaneNekretnine=nekr;
    })
    this.nekretnineService.dohvatiSveNekretnineKorisnika(this.currentUser.username).subscribe((nekr:Nekretnine[])=>{      
      this.mojeNekretnine=nekr;
    })

    this.form=new FormGroup({
      name:new FormControl(this.currentUser.name,{
        validators:[Validators.required],
      }),
      surname:new FormControl(this.currentUser.surname,{
        validators:[Validators.required],
      }),
      picture:new FormControl(null),
      username:new FormControl(this.currentUser.username,{
        validators:[Validators.required],
      }),
      password:new FormControl(this.currentUser.password,{
        validators:[Validators.required],
      }),
      mail:new FormControl(this.currentUser.mail,{
        validators:[Validators.required],
      }),
      city:new FormControl(this.currentUser.city,{
        validators:[Validators.required],
      }),
      country:new FormControl(this.currentUser.country,{
        validators:[Validators.required],
      }),
      type:new FormControl(this.currentUser.type,{
        validators:[Validators.required],
      })
      
    });
    this.form2=new FormGroup({
      ime:new FormControl(null,{
        validators:[Validators.required],
      }),
      adresa:new FormControl(null,{
        validators:[Validators.required],
      }),
      grad:new FormControl(null,{
        validators:[Validators.required],
      }),
      opstina:new FormControl(null,{
        validators:[Validators.required],
      }),
      kategorija:new FormControl("stan",{
        validators:[Validators.required],
      }),
      brojSpratova:new FormControl(null,{
        validators:[Validators.required],
      }),
      kvadratura:new FormControl(null,{
        validators:[Validators.required],
      }),
      brojSoba:new FormControl(null,{
        validators:[Validators.required],
      }),
      imaNamestaj:new FormControl(true,{
        validators:[Validators.required],
      }),
      izdajeProdaje:new FormControl("izdaje",{
        validators:[Validators.required],
      }),
      iznajmljivanjeDatumOd:new FormControl(true,{
        validators:[Validators.required],
      }),
      iznajmljivanjeDatumDo:new FormControl(true,{
        validators:[Validators.required],
      }),
      medija:new FormControl(null),
      cena:new FormControl(null,{
        validators:[Validators.required],
      }),
      vlasnik:new FormControl(this.currentUser.username,{
        validators:[Validators.required],
      })
    });
    this.nizMedija=[];
    this.re=new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.com$/);

  }

  currentUser:User;
  azuriranje:boolean;
  poruka:string;
  poruka2:string;
  svePromovisaneNekretnine:Nekretnine[];
  prikaziNekretnine:boolean;
  mojeNekretnine:Nekretnine[];


  passwordChange(){
    this.ruter.navigate(['password']);
  }

  promeniPodatke(){
    this.azuriranje=!this.azuriranje;
    // this.ruter.navigate(['azuriranje']);  
  }
  pogredajSvojeNekretnine(){
    this.prikaziNekretnine=!this.prikaziNekretnine;
  }

  form:FormGroup;
  form2:FormGroup;
  slika:boolean;
  re:RegExp;

  azuriraj(){   
    if(this.slika){
      this.userService.azurirajProfilnu(this.form.get('username').value,this.form.get('picture').value).subscribe(response=>{
        console.log(response.poruka);
      });
      this.slika=false;
    } 

    if(!(this.form.get('name').value && this.form.get('surname').value && this.form.get('username').value && this.form.get('password').value && this.form.get('mail').value && this.form.get('city').value&& this.form.get('country').value && this.form.get('type').value)){
      this.poruka='Unesite sva obavezna polja';
    }
      
    else if(!this.re.test(this.form.get('mail').value)){
      this.poruka='Email los';
    }
    else{
      this.userService.dohvatiEmail(this.form.get('mail').value).subscribe((user:User)=>{
        if(user!=null && user.mail!=this.currentUser.mail) {
          this.poruka='Korisnik sa emailom '+this.form.get('mail').value+' vec postoji';
        }
        else{
          this.userService.dohvatiKorisnika(this.form.get('username').value).subscribe((user1:User)=>{
            if(user1!=null  && user1.username!=this.currentUser.username){
              this.poruka='Korisnik sa username '+this.form.get('username').value+' vec postoji';
            }
            else{
              this.userService.azurirajKorisnika(this.form.get('name').value,this.form.get('surname').value,this.form.get('username').value,this.form.get('password').value,this.form.get('mail').value,this.form.get('city').value,this.form.get('country').value,this.form.get('type').value).subscribe((user:User)=>{     
                this.currentUser=user;
                
                this.azuriranje=false;
                this.poruka='Uspesno azurirano';
          
                this.userService.dohvatiKorisnika(user.username).subscribe((user2:User)=>{
                  localStorage.setItem('currentUser',JSON.stringify(user2));
                  this.currentUser=user2;
                });
              })
            }

          });

          
        }
    
      })
    }
  }
  
  dodataSlika(event:Event){
    if(event.target){
      const target=event.target as HTMLInputElement;
      const files=target.files as FileList;
      const file=files[0];
      this.form.get('picture').patchValue(file);
      this.slika=true;
     
    }
  }



  trazi:string;
  cenaOd:number;
  cenaDo:number;
  grad:string;
  message:string;


  nekretnine:Nekretnine[];

  pretrazi(){
    if(this.nekretnine)this.nekretnine.splice(this.nekretnine.length-1, 1);
    this.nekretnineService.pretraziPoGraduICeni(this.grad,this.cenaOd,this.cenaDo).subscribe((podaci:Nekretnine[])=>{
      this.nekretnine=podaci;
    });

    
  } 


  idiNaNekretninu(n){
    localStorage.setItem('trenutnaNekretnina',JSON.stringify(n));
    this.ruter.navigate(['nekretnine']);
  }


  nizMedija:Array<File>;


  dodataMedija(event:Event){
      if(event.target){
        const target=event.target as HTMLInputElement;
        const files=target.files as FileList;
        const file=files[0];
        this.form2.get('medija').patchValue(file);
        this.nizMedija.push(this.form2.get('medija').value);
      }
    
  }

  trenutnaNekretnina:Nekretnine;

  
  dodajNekretninu(){  
    if(!( this.form2.get('ime').value && this.form2.get('adresa').value && this.form2.get('grad').value && this.form2.get('opstina').value && this.form2.get('kategorija').value && this.form2.get('brojSpratova').value && this.form2.get('kvadratura').value && this.form2.get('brojSoba').value && this.form2.get('imaNamestaj').value && this.form2.get('izdajeProdaje').value && this.nizMedija,this.form2.get('cena').value && this.form2.get('vlasnik').value)
      && !( this.form2.get('ime').value=='' || this.form2.get('adresa').value==''  || this.form2.get('grad').value==''  || this.form2.get('opstina').value==''  || this.form2.get('kategorija').value==''  || this.form2.get('brojSpratova').value==''  || this.form2.get('kvadratura').value==''  || this.form2.get('brojSoba').value==''  || this.form2.get('imaNamestaj').value=='' || this.form2.get('izdajeProdaje').value==''  || this.nizMedija,this.form2.get('cena').value==''  || this.form2.get('vlasnik').value=='' )) this.poruka2='Unesite sva polja';
      else{ 
      this.nekretnineService.dodajNekretninu(this.form2.get('ime').value,this.form2.get('adresa').value,this.form2.get('grad').value,this.form2.get('opstina').value,this.form2.get('kategorija').value,this.form2.get('brojSpratova').value,this.form2.get('kvadratura').value,this.form2.get('brojSoba').value,this.form2.get('imaNamestaj').value,this.form2.get('izdajeProdaje').value,this.form2.get('iznajmljivanjeDatumOd').value,this.form2.get('iznajmljivanjeDatumDo').value,this.nizMedija,this.form2.get('cena').value,this.form2.get('vlasnik').value).subscribe(response=>{     
        this.poruka2=response.poruka;
        this.nekretnineService.dohvatiSveNekretnineKorisnika(this.currentUser.username).subscribe((nekr:Nekretnine[])=>{      
          this.mojeNekretnine=nekr;
        });
      })
    }
  }
}
