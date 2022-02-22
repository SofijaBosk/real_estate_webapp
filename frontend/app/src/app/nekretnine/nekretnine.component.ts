import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Nekretnine } from '../models/nekretnine';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-nekretnine',
  templateUrl: './nekretnine.component.html',
  styleUrls: ['./nekretnine.component.css']
})
export class NekretnineComponent implements OnInit {

  constructor(private nekretnineService:NekretnineService) { }
  
  ngOnInit(): void {


    this.trenutnaNekretnina=JSON.parse(localStorage.getItem('trenutnaNekretnina'));
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser==null) this.notguest=false;
    else{
      if(this.currentUser.type==2 || this.currentUser.type==0) this.agent=true;
      if(this.currentUser.username===this.trenutnaNekretnina.vlasnik || this.trenutnaNekretnina.vlasnik==="Agencija" && this.agent ) this.vlasnik=true;
      else this.notguest=true;
      this.form2=new FormGroup({
        _id:new FormControl(this.trenutnaNekretnina._id,{
          validators:[Validators.required],
        }),
        ime:new FormControl(this.trenutnaNekretnina.ime,{
          validators:[Validators.required],
        }),
        adresa:new FormControl(this.trenutnaNekretnina.adresa,{
          validators:[Validators.required],
        }),
        grad:new FormControl(this.trenutnaNekretnina.grad,{
          validators:[Validators.required],
        }),
        opstina:new FormControl(this.trenutnaNekretnina.opstina,{
          validators:[Validators.required],
        }),
        kategorija:new FormControl(this.trenutnaNekretnina.kategorija,{
          validators:[Validators.required],
        }),
        brojSpratova:new FormControl(this.trenutnaNekretnina.brojSpratova,{
          validators:[Validators.required],
        }),
        kvadratura:new FormControl(this.trenutnaNekretnina.kvadratura,{
          validators:[Validators.required],
        }),
        brojSoba:new FormControl(this.trenutnaNekretnina.brojSoba,{
          validators:[Validators.required],
        }),
        imaNamestaj:new FormControl(this.trenutnaNekretnina.imaNamestaj,{
          validators:[Validators.required],
        }),
        izdajeProdaje:new FormControl(this.trenutnaNekretnina.izdajeProdaje,{
          validators:[Validators.required],
        }),
        iznajmljivanjeDatumOd:new FormControl(this.trenutnaNekretnina.iznajmljivanjeDatumOd,{
          validators:[Validators.required],
        }),
        iznajmljivanjeDatumDo:new FormControl(this.trenutnaNekretnina.iznajmljivanjeDatumDo,{
          validators:[Validators.required],
        }),
        medija:new FormControl(this.trenutnaNekretnina.slike),
        cena:new FormControl(this.trenutnaNekretnina.cena,{
          validators:[Validators.required],
        }),
        vlasnik:new FormControl(this.trenutnaNekretnina.vlasnik,{
          validators:[Validators.required],
        }),
        odobrena:new FormControl(this.trenutnaNekretnina.odobrena,{
          validators:[Validators.required],
        }),    
        promovisana:new FormControl(this.trenutnaNekretnina.promovisana,{
          validators:[Validators.required],
        })         
      });
    this.nizMedija=[];
    this.nizMedija2=[];
    this.kredit=this.trenutnaNekretnina.cena*20/100;

    for(let n of this.trenutnaNekretnina.prihvacenePonude){
      if(n.username===this.currentUser.username) {this.kupac=true;break;}
    }

    this.iznajmljivanjeDatumOd=new Date();
    this.iznajmljivanjeDatumDo= this.iznajmljivanjeDatumOd;
    this.nacinPlacanja='gotovina'
  }
  
    // console.log(this.trenutnaNekretnina.slike);
    this.form=new FormGroup({
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
      kategorija:new FormControl('stan',{
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
      izdajeProdaje:new FormControl('izdaje',{
        validators:[Validators.required],
      }),
      iznajmljivanjeDatumOd:new FormControl(null,{
        validators:[Validators.required],
      }),
      iznajmljivanjeDatumDo:new FormControl(null,{
        validators:[Validators.required],
      }),
      medija:new FormControl(null),
      cena:new FormControl(null,{
        validators:[Validators.required],
      }),
      vlasnik:new FormControl(this.agent?'Agencija':this.currentUser.username,{
        validators:[Validators.required],
      })    
    });

  }
  grad:string;
  cenaOd:string;
  cenaDo:string;
  form:FormGroup;
  message:string;
  message2:string;
  nizMedija:Array<File>;
  nizMedija2:Array<File>;
  currentUser:User;
  agent:boolean;
  form2:FormGroup;
  vlasnik:boolean;

  

  dodataMedija(event:Event){
      if(event.target){
        const target=event.target as HTMLInputElement;
        const files=target.files as FileList;
        const file=files[0];
        this.form.get('medija').patchValue(file);
        this.nizMedija.push(this.form.get('medija').value);
      }
  }


  dodataMedija2(event:Event){
    if(event.target){
      const target=event.target as HTMLInputElement;
      const files=target.files as FileList;
      const file=files[0];
      this.form2.get('medija').patchValue(file);
      this.nizMedija2.push(this.form2.get('medija').value);
      this.slikaDodata=true;
    }
}

  nekretnine:Nekretnine[];
  trenutnaNekretnina:Nekretnine;
  notguest:boolean;
  kupac:boolean;
  // pretrazi(){
  //   console.log(this.nekretnine);
  //   if(this.nekretnine)this.nekretnine.splice(this.nekretnine.length-1, 1);
  //   this.nekretnineService.pretraziPoGraduICeni(this.grad,this.cenaOd,this.cenaDo).subscribe((podaci:Nekretnine[])=>{
  //     this.nekretnine=podaci;
  //   });
  // } 

  
  dodajNekretninu(){   
    if(!( this.form.get('ime').value && this.form.get('adresa').value && this.form.get('grad').value && this.form.get('opstina').value && this.form.get('kategorija').value && this.form.get('brojSpratova').value && this.form.get('kvadratura').value && this.form.get('brojSoba').value && this.form.get('imaNamestaj').value && this.form.get('izdajeProdaje').value && this.nizMedija,this.form.get('cena').value && this.form.get('vlasnik').value)
      && !( this.form.get('ime').value=='' || this.form.get('adresa').value==''  || this.form.get('grad').value==''  || this.form.get('opstina').value==''  || this.form.get('kategorija').value==''  || this.form.get('brojSpratova').value==''  || this.form.get('kvadratura').value==''  || this.form.get('brojSoba').value==''  || this.form.get('imaNamestaj').value=='' || this.form.get('izdajeProdaje').value==''  || this.nizMedija,this.form.get('cena').value==''  || this.form.get('vlasnik').value=='' )) this.message2='Unesite sva polja';
      else{
    this.nekretnineService.dodajNekretninu(this.form.get('ime').value,this.form.get('adresa').value,this.form.get('grad').value,this.form.get('opstina').value,this.form.get('kategorija').value,this.form.get('brojSpratova').value,this.form.get('kvadratura').value,this.form.get('brojSoba').value,this.form.get('imaNamestaj').value,this.form.get('izdajeProdaje').value,this.form.get('iznajmljivanjeDatumOd').value,this.form.get('iznajmljivanjeDatumDo').value,this.nizMedija,this.form.get('cena').value,this.form.get('vlasnik').value).subscribe(response=>{     
      this.message2=response.poruka;
    })
  }
  }
  slikaDodata:boolean;

  azurirajNekretninu(){
    if(this.slikaDodata){
      this.nekretnineService.azurirajSlike(this.form2.get('_id').value,this.form2.get('ime').value,this.nizMedija2).subscribe(response=>{
        console.log(response.poruka);
      })
      this.slikaDodata=false;
    }
    console.log(this.form2.get('odobrena').value);
    this.nekretnineService.azurirajNekretninu(this.form2.get('_id').value,this.form2.get('ime').value,this.form2.get('adresa').value,this.form2.get('grad').value,this.form2.get('opstina').value,this.form2.get('kategorija').value,this.form2.get('brojSpratova').value,this.form2.get('kvadratura').value,this.form2.get('brojSoba').value,this.form2.get('imaNamestaj').value,this.form2.get('izdajeProdaje').value,this.form2.get('iznajmljivanjeDatumOd').value,this.form2.get('iznajmljivanjeDatumDo').value,this.form2.get('cena').value,this.form2.get('vlasnik').value,this.form2.get('promovisana').value,this.form2.get('odobrena').value).subscribe(response=>{
      this.message=response.poruka;
      this.nekretnineService.dohvatiNekretninuPoID(this.trenutnaNekretnina._id).subscribe((nek:Nekretnine)=>{
        this.trenutnaNekretnina=nek;
        localStorage.setItem('trenutnaNekretnina',JSON.stringify(this.trenutnaNekretnina));
      })
      
    });


  }
      
      
    
      // if(this.iznajmljivanjeDatumOd>this.trenutnaNekretnina.iznajmljivanjeDatumOd && this.iznajmljivanjeDatumDo<this.trenutnaNekretnina.iznajmljivanjeDatumDo
      //   || this.iznajmljivanjeDatumDo<this.trenutnaNekretnina.iznajmljivanjeDatumDo
      //   ){
      //     this.message='Iznajmivanje za ovaj period je zauzet';
      //   }
       
          
       
  
  iznajmljivanjeDatumOd:Date;
  iznajmljivanjeDatumDo:Date;
  nacinPlacanja:string;
  kredit:number;
  mozeKontaktirati:boolean;
  
  kontaktirajVlasnika(){
    //Zakljucak:mora sve da se konvertuje ponovo u new Date() pre nego sto de uporedi
    console.log("Novo:")
    let noviDatum=new Date();
    let nekistring=new Date("2022-5-6");

    console.log(nekistring);
    console.log(nekistring<noviDatum);
     
    console.log("Staro:")
    console.log(noviDatum);
    let stariDatumString= this.iznajmljivanjeDatumOd.toString();
    let stariDatum=new Date(stariDatumString);
    console.log(stariDatum);
    console.log(noviDatum>stariDatum);
    console.log(noviDatum<stariDatum);

    // if(this.trenutnaNekretnina.izdajeProdaje=='izdaje'){
    //   if(this.iznajmljivanjeDatumOd==this.iznajmljivanjeDatumDo) {this.message="Los datum";return;}
    //   this.mozeKontaktirati=true;
    //   for(let n of this.trenutnaNekretnina.prihvacenePonude){
    //     if(this.iznajmljivanjeDatumOd>n.iznajmljivanjeDatumOd && this.iznajmljivanjeDatumOd<n.iznajmljivanjeDatumDo || this.iznajmljivanjeDatumDo<n.iznajmljivanjeDatumDo){
    //       this.message='Iznajmivanje za ovaj period je zauzet'; this.mozeKontaktirati=false; break;
    //     }
    //   }
    //   if(this.mozeKontaktirati){
    //     this.nekretnineService.prinesiPonuduZaIznajmivanje(this.currentUser.username,this.trenutnaNekretnina._id,this.iznajmljivanjeDatumOd,this.iznajmljivanjeDatumDo).subscribe(response=>{
    //       this.message=response.poruka;
    //     })
    //   }
 
    // }else{
    //   if(this.nacinPlacanja==='') this.message='Unesite nacin placanja';
    //   else{
    //     this.nekretnineService.prinesiPonuduZaPlacanje(this.currentUser.username,this.trenutnaNekretnina._id,this.nacinPlacanja).subscribe(response=>{
    //       this.message=response.poruka;
    //     })
    //   }


    //  }

  }

  prihvatiPonudu(n){
    this.nekretnineService.prihvatiPonudu(this.trenutnaNekretnina._id,n).subscribe(response=>{
      this.message=response.poruka;
    })
    this.nekretnineService.odbaciPonudu(this.trenutnaNekretnina._id,n).subscribe(response=>{
      if(this.trenutnaNekretnina.izdajeProdaje==='prodaje'){
        for(let n of this.trenutnaNekretnina.ponude){
          this.nekretnineService.odbaciPonudu(this.trenutnaNekretnina._id,n).subscribe(response=>{
            this.dovnatiTrenutnuNekretninu();
          })
        }
      }
      else{
        this.dovnatiTrenutnuNekretninu();
      }
      
    })
    
    
    this.kupljeno=true;
  }
  odbaciPonudu(n){
    this.nekretnineService.odbaciPonudu(this.trenutnaNekretnina._id,n).subscribe(response=>{
      this.message=response.poruka;
      this.dovnatiTrenutnuNekretninu();
    })
  }
  dovnatiTrenutnuNekretninu(){
    this.nekretnineService.dohvatiNekretninuPoImenu(this.trenutnaNekretnina.ime).subscribe((nek:Nekretnine)=>{
      this.trenutnaNekretnina=nek;
      console.log(nek);
    })
  }


  kupljeno:boolean;



  obobriPonuduKaoAgent(n){
    const ponuda={
      username :n.username,
      nacinPlacanja: n.nacinPlacanja,
      tipPlacanja:n.tipPlacanja,
      datumStvaranja:n.datumStvaranja,
      iznajmljivanjeDatumOd:n.iznajmljivanjeDatumOd,
      iznajmljivanjeDatumDo:n.iznajmljivanjeDatumDo,
      datumPotvrde:new Date(),
      status:"odobren" //obrati paznju
    }

    console.log(ponuda);
    this.nekretnineService.obobriPonuduKaoAgent(this.trenutnaNekretnina._id,n,ponuda).subscribe(response=>{
      this.message='Odobrena ponuda'
      this.dovnatiTrenutnuNekretninu();
    })
  }
}
