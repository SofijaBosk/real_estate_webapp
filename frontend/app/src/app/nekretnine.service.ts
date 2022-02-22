import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NekretnineService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }


  pretraziPoGraduICeni(grad,cenaOd,cenaDo){
    const data={
      grad:grad,
      cenaOd:cenaOd,
      cenaDo:cenaDo
    }

    return this.http.post(`${this.uri}/nekretnine/searchNekretnine`,data);

  }

  dodajNekretninu(ime,adresa,grad,opstina,kategorija,brojSpratova,kvadratura,brojSoba,imaNamestaj,izdajeProdaje,iznajmljivanjeDatumOd,iznajmljivanjeDatumDo,medija,cena,vlasnik){

    let podaci = new FormData();
    podaci.append('ime', ime);
    podaci.append('adresa', adresa);  
    podaci.append('grad', grad);
    podaci.append('opstina', opstina);
    podaci.append('kategorija', kategorija);
    podaci.append('brojSpratova', brojSpratova);
    podaci.append('kvadratura', kvadratura);
    podaci.append('brojSoba', brojSoba);
    podaci.append('imaNamestaj', imaNamestaj);
    podaci.append('izdajeProdaje', izdajeProdaje);
    podaci.append('iznajmljivanjeDatumOd', iznajmljivanjeDatumOd);
    podaci.append('iznajmljivanjeDatumDo', iznajmljivanjeDatumDo);
    podaci.append('cena', cena);
    podaci.append('vlasnik', vlasnik);
    let i=0;
    while (i< medija.length) {
      podaci.append('media', medija[i], ime);
      i++;
    }
    return this.http.post<{poruka:string}>(`${this.uri}/nekretnine/dodajNekretninu`, podaci);
  
  }


  
  dohvatiSveNekretnine(){
    return this.http.get(`${this.uri}/nekretnine/dohvatiSveNekretnine`);
  }

  azurirajNekretninu(_id,ime,adresa,grad,opstina,kategorija,brojSpratova,kvadratura,brojSoba,imaNamestaj,izdajeProdaje,DatumOd,DatumDo,cena,vlasnik,promovisana,odobrena){

    
    let podaci ={
      _id:_id,
      ime: ime,
      adresa :adresa,
      grad:grad,
      opstina: opstina,
      kategorija: kategorija,
      brojSpratova:brojSpratova,
      kvadratura: kvadratura,
      brojSoba: brojSoba,
      imaNamestaj: imaNamestaj,
      izdajeProdaje: izdajeProdaje,
      iznajmljivanjeDatumOd:DatumOd,
      iznajmljivanjeDatumDo: DatumDo,
      cena: cena,
      vlasnik:vlasnik,
      odobrena:odobrena,
      promovisana:promovisana
    }
    console.log(podaci);
    return this.http.post<{poruka:string}>(`${this.uri}/nekretnine/azurirajNekretninu`, podaci);
  
  }

  dohvatiSvePromovisaneNekretnine(){
    return this.http.get(`${this.uri}/nekretnine/dohvatiSvePromovisaneNekretnine`);
  }


  dohvatiSveNekretnineKorisnika(username){
    const podaci={
      username:username
    }

    console.log(username);
    return this.http.post(`${this.uri}/nekretnine/dohvatiSveNekretnineKorisnika`, podaci);

  }




  prinesiPonuduZaIznajmivanje(username,_id,iznajmljivanjeDatumOd,iznajmljivanjeDatumDo){
    const podaci={
      username:username,
      _id:_id,
      iznajmljivanjeDatumOd:iznajmljivanjeDatumOd,
      iznajmljivanjeDatumDo:iznajmljivanjeDatumDo,
      status:'nije obobrena'
    }
    return this.http.post<{poruka:string}>(`${this.uri}/nekretnine/prinesiPonuduZaIznajmivanje`, podaci);
  }

  prinesiPonuduZaPlacanje(username,_id,nacinPlacanja){
    const podaci={
      username:username,
      _id:_id,
      nacinPlacanja:nacinPlacanja,
      status:'nije obobrena'
    }
    return this.http.post<{poruka:string}>(`${this.uri}/nekretnine/prinesiPonuduZaPlacanje`, podaci);
  }
  prihvatiPonudu(_id,ponuda){
    const podaci={
      _id:_id,
      ponuda:ponuda,
    }
    return this.http.post<{poruka:string}>(`${this.uri}/nekretnine/prihvatiPonudu`, podaci);
  }
  odbaciPonudu(_id,ponuda){
    const podaci={
      _id:_id,
      ponuda:ponuda
    } 
    return this.http.post<{poruka:string}>(`${this.uri}/nekretnine/odbaciPonudu`, podaci);
  }

  dohvatiNekretninuPoImenu(ime){
    const podaci={
      ime:ime
    } 
    return this.http.post(`${this.uri}/nekretnine/dohvatiNekretninuPoImenu`, podaci);
  
  }

  dohvatiNekretninuPoID(_id){
    const podaci={
      _id:_id
    } 
    return this.http.post(`${this.uri}/nekretnine/dohvatiNekretninuPoID`, podaci);
  }

  azurirajSlike(_id,ime,medija){
    console.log(_id);
    console.log(medija[0]);
    let podaci = new FormData();
    podaci.append('_id', _id);
    podaci.append('ime', ime);
    let i=0;
    while (i< medija.length) {
      podaci.append('media', medija[i], ime);
      i++;
    }
    console.log(podaci.get("ime"));
    console.log(podaci.get("media"));
    return this.http.post<{poruka:string}>(`${this.uri}/nekretnine/azurirajSlike`, podaci);

  }
  obobriPonuduKaoAgent(_id,stara,nova){
    const podaci={
      _id:_id,
      stara:stara,
      nova:nova
    } 
    return this.http.post<{poruka:string}>(`${this.uri}/nekretnine/obobriPonuduKaoAgent`, podaci);
  }

}
