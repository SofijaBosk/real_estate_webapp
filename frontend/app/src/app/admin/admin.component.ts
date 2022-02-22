import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet, ThemeService } from 'ng2-charts';import { Nekretnine } from '../models/nekretnine';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService:UserService , private http:HttpClient, private ruter:Router, private nekretnineService:NekretnineService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }
  
  ngOnInit(): void {
    this.izabranKorisnik=new User();
    this.form=new FormGroup({
      name:new FormControl(this.izabranKorisnik.name,{
        validators:[Validators.required],
      }),
      surname:new FormControl(this.izabranKorisnik.surname,{
        validators:[Validators.required],
      }),
      picture:new FormControl(null),
      username:new FormControl(this.izabranKorisnik.username,{
        validators:[Validators.required],
      }),
      password:new FormControl(this.izabranKorisnik.password,{
        validators:[Validators.required],
      }),
      password2:new FormControl(null,{
        validators:[Validators.required],
      }),
      mail:new FormControl(this.izabranKorisnik.mail,
        Validators.compose([Validators.required,Validators.pattern(this.pat)]),
      ),
      city:new FormControl(this.izabranKorisnik.city,{
        validators:[Validators.required],
      }),
      country:new FormControl(this.izabranKorisnik.country,{
        validators:[Validators.required],
      }),
      type:new FormControl(this.izabranKorisnik.type,{
        validators:[Validators.required],
      })
      
    })
    this.re=new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.com$/);
    // this.re2=new RegExp("");

    this.userService.dohvatiSveKorisnike().subscribe((user:User[])=>{
      this.sviKorisnici=user;
    });

    this.formNekretnina=new FormGroup({
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
      vlasnik:new FormControl('Agencija',{
        validators:[Validators.required],
      })     
    })

    this.nizMedija=[];


    this.nekretnineService.dohvatiSveNekretnine().subscribe((nekr:Nekretnine[])=>{      
      this.nekretnine=nekr;
      this.odrediProcenatKupovineiIzdavanja();
      this.nekretninaUGradu();
      this.nekretninaUCenovnomRanku();
    });

    
  }
  form:FormGroup;
  pattern:PatternValidator;
  pat:string;
  message:string;
  message2:string;
  re:RegExp;
  dodajKor:boolean;
  azurirajKor:boolean;
  sviKorisnici:User[];
  izabranKorisnik:User;


  passwordChange(){
    this.ruter.navigate(['password']);
  }
  azurirajKorisnika(k){
    if(this.izabranKorisnik==k)this.azurirajKor=false;
    else{
    this.izabranKorisnik=k;
    this.azurirajKor=true;
    this.form.get('name').setValue(this.izabranKorisnik.name);
    this.form.get('surname').setValue(this.izabranKorisnik.surname);
    this.form.get('username').setValue(this.izabranKorisnik.username);
    this.form.get('password').setValue(this.izabranKorisnik.password);
    this.form.get('mail').setValue(this.izabranKorisnik.mail);
    this.form.get('city').setValue(this.izabranKorisnik.city);
    this.form.get('country').setValue(this.izabranKorisnik.country);
    this.form.get('type').setValue(this.izabranKorisnik.type);
    }

  }
  azurirajKorisnikaServer(){
    if(this.slika){
      this.userService.azurirajProfilnu(this.form.get('username').value,this.form.get('picture').value).subscribe(response=>{
        console.log(response.poruka);
      });
      this.slika=false;
    } 

    this.userService.azurirajKorisnika(this.form.get('name').value,this.form.get('surname').value,this.form.get('username').value,this.form.get('password').value,this.form.get('mail').value,this.form.get('city').value,this.form.get('country').value,this.form.get('type').value).subscribe((user:User)=>{           
      // window.location.reload();
      this.message='Korisnik '+user.username+' uspesno azuriran';
      this.userService.dohvatiSveKorisnike().subscribe((user:User[])=>{
        this.sviKorisnici=user;
      });
      
    })
  }

  dodajKorisnikaOtvori(){
    this.dodajKor=!this.dodajKor;
  }
  azurirajKorisnikaOtvori(){
    this.azurirajKor=!this.azurirajKor;
  }
  
  dodajKorisnika(){
    if(!(this.form.get('name').value && this.form.get('surname').value && this.form.get('username').value && this.form.get('password').value && this.form.get('mail').value && this.form.get('city').value&& this.form.get('country').value && this.form.get('type').value)
    || (this.form.get('name').value=='' || this.form.get('surname').value=='' || this.form.get('username').value=='' || this.form.get('password').value=='' || this.form.get('mail').value=='' || this.form.get('city').value=='' || this.form.get('country').value=='' || this.form.get('type').value==''))
      this.message='Unesite sva obavezna polja';
    else if(!this.re.test(this.form.get('mail').value)){
      this.message='Mail los';
    }
    else if(!(this.form.get('password2').value===this.form.get('password').value)){
      console.log(this.form.get('password2').value);
      console.log(this.form.get('password').value);
      this.message='Pogresna lozinka';
    }
    else{
      console.log(this.re.test(this.form.get('mail').value));
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
                  this.message=response.poruka;
                this.userService.dohvatiSveKorisnike().subscribe((user:User[])=>{
                  this.sviKorisnici=user;
                });
                })
                
              }
            });
        }
      
      })
      
      
    }
  }
  slika:boolean;

  dodataSlika(event:Event){
    if(event.target){
      const target=event.target as HTMLInputElement;
      const files=target.files as FileList;
      const file=files[0];
      this.form.get('picture').patchValue(file);
      this.slika=true;
    }
  }

  obrisiKorisnika(k){
    this.userService.obrisiKorisnika(k).subscribe(response=>{
      this.message=response.poruka;
      this.userService.dohvatiSveKorisnike().subscribe((user:User[])=>{
        this.sviKorisnici=user;
      });
    });
    
  }
  odobriKorisnika(k){
    this.izabranKorisnik=k;
    this.form.get('name').setValue(this.izabranKorisnik.name);
    this.form.get('surname').setValue(this.izabranKorisnik.surname);
    this.form.get('username').setValue(this.izabranKorisnik.username);
    this.form.get('password').setValue(this.izabranKorisnik.password);
    this.form.get('mail').setValue(this.izabranKorisnik.mail);
    this.form.get('city').setValue(this.izabranKorisnik.city);
    this.form.get('country').setValue(this.izabranKorisnik.country);
    this.form.get('type').setValue('1');

    this.azurirajKorisnikaServer();
  }




    //Charts:


    kuceIzdaje:number;
    kuceProdaje:number;
    stanoviProdaje:number;
    stanoviIzdaje:number;

    odrediProcenatKupovineiIzdavanja(){
      let i=0;
       this.kuceIzdaje=0;
       this.kuceProdaje=0;
       this.stanoviProdaje=0;
       this.stanoviIzdaje=0;
       for(let n of this.nekretnine){
        if(n.izdajeProdaje==='izdaje'){
          if(n.kategorija==='kuca')this.kuceIzdaje++;
          if(n.kategorija==='stan')this.stanoviIzdaje++;
        }
        else{
          if(n.kategorija==='kuca')this.kuceProdaje++;
          if(n.kategorija==='stan')this.stanoviProdaje++;
        }

        i++;
      }
      this.pieChartData1=[this.stanoviIzdaje,this.stanoviProdaje];
      this.pieChartData2=[this.kuceIzdaje,this.kuceProdaje];
      console.log(this.stanoviIzdaje);
    }

    gradovi:Label[];
    gradoviKolicinaNekretnina:number[];

    nekretninaUGradu(){
      this.gradovi=[];
      this.gradoviKolicinaNekretnina=[];

      for(let n of this.nekretnine){
        if(!this.gradovi.includes(n.grad)){
          this.gradovi.push(n.grad);
          this.gradoviKolicinaNekretnina.push(1);//++this.gradoviKolicinaNekretnina[this.gradoviKolicinaNekretnina.length]
        }else{
          this.gradoviKolicinaNekretnina[this.gradovi.indexOf(n.grad)]++;
        }
        
      }
      console.log(this.gradovi);
      console.log(this.gradoviKolicinaNekretnina);
      this.lineChartLabels1=this.gradovi;
      this.lineChartData1= [
        { data: this.gradoviKolicinaNekretnina, label: 'Kolicina nekretnina' },
      ];
    }

    cenovniRand:number[];

    nekretninaUCenovnomRanku(){
      this.cenovniRand=[0,0,0,0,0,0,0,0,0];
      for(let n of this.nekretnine){
        if(n.cena<20000) this.cenovniRand[0]++;
        else if(n.cena<40000) this.cenovniRand[1]++;
        else if(n.cena<60000) this.cenovniRand[2]++;
        else if(n.cena<80000) this.cenovniRand[3]++;
        else if(n.cena<100000) this.cenovniRand[4]++;
        else if(n.cena<120000) this.cenovniRand[5]++;
        else if(n.cena<140000) this.cenovniRand[6]++;
        else this.cenovniRand[7]++;
      }
      console.log(this.cenovniRand);
      this.lineChartData2= [
        { data: this.cenovniRand, label: 'Nekretnine u rangu cene' },
      ];



    }
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartLabels1: Label[] = [['Stanovi', 'koji se','izdaju'],['Stanovi', 'koji se','prodaju']];
    public pieChartLabels2: Label[] = [['Kuce', 'koji se','izdaju'],['Kuce', 'koji se','prodaju']];
    
    public pieChartData1: SingleDataSet = [100,100];
    public pieChartData2: SingleDataSet = [30,50];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];



    public lineChartData1: ChartDataSets[] = [
      { data: [65, 59, 80, 150, 56, 55, 40], label: 'Gradovi' },
    ];
    public lineChartLabels1: Label[] = ['50', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartData2: ChartDataSets[] = [
      { data: [20000, , 40000, , 60000, 80000, 100000, 120000], label: 'Gradovi' },
    ];
    public lineChartLabels2: Label[] = ['<20 000','20 000-40 000', '40 000-60 000', '60 000-80 000', '80 000-100 000', '100 000-120 000','120 000-140 000', '140 000>'];
    public lineChartOptions= {
      responsive: true,
    };
    public lineChartColors: Color[] = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];



//dodavanje nekretnina
nizMedija:Array<File>;
nekretnine:Nekretnine[];
formNekretnina:FormGroup;
  dodataMedija(event:Event){

    if(event.target){
      const target=event.target as HTMLInputElement;
      const files=target.files as FileList;
      const file=files[0];
      this.formNekretnina.get('medija').patchValue(file);
      this.nizMedija.push(this.formNekretnina.get('medija').value);
    }
  }
  
    dodajNekretninu(){ 
      if(!( this.formNekretnina.get('ime').value && this.formNekretnina.get('adresa').value && this.formNekretnina.get('grad').value && this.formNekretnina.get('opstina').value && this.formNekretnina.get('kategorija').value && this.formNekretnina.get('brojSpratova').value && this.formNekretnina.get('kvadratura').value && this.formNekretnina.get('brojSoba').value && this.formNekretnina.get('imaNamestaj').value && this.formNekretnina.get('izdajeProdaje').value && this.nizMedija,this.formNekretnina.get('cena').value && this.formNekretnina.get('vlasnik').value)
      && !( this.formNekretnina.get('ime').value=='' || this.formNekretnina.get('adresa').value==''  || this.formNekretnina.get('grad').value==''  || this.formNekretnina.get('opstina').value==''  || this.formNekretnina.get('kategorija').value==''  || this.formNekretnina.get('brojSpratova').value==''  || this.formNekretnina.get('kvadratura').value==''  || this.formNekretnina.get('brojSoba').value==''  || this.formNekretnina.get('imaNamestaj').value=='' || this.formNekretnina.get('izdajeProdaje').value==''  || this.nizMedija,this.formNekretnina.get('cena').value==''  || this.formNekretnina.get('vlasnik').value=='' )) this.message2='Unesite sva polja';
      else{
        this.nekretnineService.dodajNekretninu(this.formNekretnina.get('ime').value,this.formNekretnina.get('adresa').value,this.formNekretnina.get('grad').value,this.formNekretnina.get('opstina').value,this.formNekretnina.get('kategorija').value,this.formNekretnina.get('brojSpratova').value,this.formNekretnina.get('kvadratura').value,this.formNekretnina.get('brojSoba').value,this.formNekretnina.get('imaNamestaj').value,this.formNekretnina.get('izdajeProdaje').value,this.formNekretnina.get('iznajmljivanjeDatumOd').value,this.formNekretnina.get('iznajmljivanjeDatumDo').value,this.nizMedija,this.formNekretnina.get('cena').value,this.formNekretnina.get('vlasnik').value).subscribe(response=>{     
          console.log(response.poruka);
          this.message2=response.poruka;
          this.nekretnineService.dohvatiSveNekretnine().subscribe((nekr:Nekretnine[])=>{      
            this.nekretnine=nekr;
          });
        })
      }
    
    }


    idiNaNekretninu(n){
      localStorage.setItem('trenutnaNekretnina',JSON.stringify(n));
      this.ruter.navigate(['nekretnine']);
      
    }
}
