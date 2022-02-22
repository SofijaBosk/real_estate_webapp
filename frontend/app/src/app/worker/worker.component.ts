import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet, ThemeService } from 'ng2-charts';
import { Nekretnine } from '../models/nekretnine';
import { User } from '../models/user';
import { NekretnineService } from '../nekretnine.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  constructor(private ruter:Router,private nekretnineService:NekretnineService, private themeService:ThemeService,private userService:UserService) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
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

    this.userService.dohvatiSveKorisnike().subscribe((kor:User[])=>{
      this.sviKorisnici=kor;
    })

  }
  form:FormGroup;
  message:string;
  nizMedija:Array<File>;
  nekretnine:Nekretnine[];
  sviKorisnici:User[];

  dodataMedija(event:Event){

    if(event.target){
      const target=event.target as HTMLInputElement;
      const files=target.files as FileList;
      const file=files[0];
      this.form.get('medija').patchValue(file);
      this.nizMedija.push(this.form.get('medija').value);
    }
  }
  
    dodajNekretninu(){  
      if(!( this.form.get('ime').value && this.form.get('adresa').value && this.form.get('grad').value && this.form.get('opstina').value && this.form.get('kategorija').value && this.form.get('brojSpratova').value && this.form.get('kvadratura').value && this.form.get('brojSoba').value && this.form.get('imaNamestaj').value && this.form.get('izdajeProdaje').value && this.nizMedija,this.form.get('cena').value && this.form.get('vlasnik').value)
      && !( this.form.get('ime').value=='' || this.form.get('adresa').value==''  || this.form.get('grad').value==''  || this.form.get('opstina').value==''  || this.form.get('kategorija').value==''  || this.form.get('brojSpratova').value==''  || this.form.get('kvadratura').value==''  || this.form.get('brojSoba').value==''  || this.form.get('imaNamestaj').value=='' || this.form.get('izdajeProdaje').value==''  || this.nizMedija,this.form.get('cena').value==''  || this.form.get('vlasnik').value=='' )) this.message='Unesite sva polja';
      else{ 
      this.nekretnineService.dodajNekretninu(this.form.get('ime').value,this.form.get('adresa').value,this.form.get('grad').value,this.form.get('opstina').value,this.form.get('kategorija').value,this.form.get('brojSpratova').value,this.form.get('kvadratura').value,this.form.get('brojSoba').value,this.form.get('imaNamestaj').value,this.form.get('izdajeProdaje').value,this.form.get('iznajmljivanjeDatumOd').value,this.form.get('iznajmljivanjeDatumDo').value,this.nizMedija,this.form.get('cena').value,this.form.get('vlasnik').value).subscribe(response=>{     
        this.message=response.poruka;
        this.nekretnineService.dohvatiSveNekretnine().subscribe((nekr:Nekretnine[])=>{      
          this.nekretnine=nekr;
        });
      })
    }
  }

    // dohvatiSveNekretnine(){
    //   this.nekretnineService.dohvatiSveNekretnine().subscribe((nekr:Nekretnine[])=>{      
    //     this.nekretnine=nekr;
    //   })
    // }
    idiNaNekretninu(n){
      localStorage.setItem('trenutnaNekretnina',JSON.stringify(n));
      this.ruter.navigate(['nekretnine']);
      
    }



    passwordChange(){
      this.ruter.navigate(['password']);
    }


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


    //Charts:
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
    public lineChartLabels2: Label[] = ['<20 000','20 000-40 000', '40 000-60 000', '60 000-80 000', '80 000-100 000', '100 000-120 000', '120 000-140 000',"140 000>"];
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




    
}

