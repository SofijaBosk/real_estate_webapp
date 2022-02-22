import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnine } from '../models/nekretnine';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(private nekretnineService:NekretnineService, private ruter:Router) { }

  ngOnInit(): void {

    this.nekretnineService.dohvatiSvePromovisaneNekretnine().subscribe((nekr:Nekretnine[])=>{      
      this.sveNekretnine=nekr;
    })    
  }

  trazi:string;
  cenaOd:number;
  cenaDo:number;
  grad:string;
  message:string;

  nekretnine:Nekretnine[];
  sveNekretnine:Nekretnine[];

  pretrazi(){
    this.message='';
    if(!(this.cenaOd || this.cenaDo || this.grad) || (!(this.cenaOd || this.cenaDo) && this.grad==''))this.message='Unesite bar 1 parametar';
    else{   
    if(this.nekretnine)this.nekretnine.splice(this.nekretnine.length-1, 1);
    this.nekretnineService.pretraziPoGraduICeni(this.grad,this.cenaOd,this.cenaDo).subscribe((podaci:Nekretnine[])=>{
      this.nekretnine=podaci;
    });
    }
    
  } 

  idiNaNekretninu(n){
    localStorage.setItem('trenutnaNekretnina',JSON.stringify(n));
    this.ruter.navigate(['nekretnine']);
  }
}
