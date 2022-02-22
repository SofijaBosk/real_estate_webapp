import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(username, password){
    const podaci = {
      username: username,
      password: password,
    }

    return this.http.post(`${this.uri}/users/login`, podaci);
  }
  LoggedInAdmin(){
    let u=JSON.parse(localStorage.getItem("currentUser"));
    if(!u) return false;
    switch(u.type){
      case 0: return true; break;
      case 1: return false;break;
      case 2: return false;break;
    }
  }
  LoggedInUser(){
    let u=JSON.parse(localStorage.getItem("currentUser"));
    if(!u) return false;
    switch(u.type){
      case 0: return false; break;
      case 1: return true;break;
      case 2: return false;break;
    }
  }

  LoggedInAgent(){
    let u=JSON.parse(localStorage.getItem("currentUser"));
    if(!u) return false;
    switch(u.type){
      case 0: return false; break;
      case 1: return false;break;
      case 2: return true;break;
    }
  }
  LoggedInAnyUser(){
    let u=JSON.parse(localStorage.getItem("currentUser"));
    if(!u) return false;
    if(u.type<4 && u.type>=0)return true;
    else return false;
    }
  
 

  register(name:string,surname:string,picture:File,username:string,password:string,mail:string,city:string,country:string,type:string){
      
    let podaci = new FormData();
    podaci.append('name', name);
    podaci.append('surname', surname);  
    podaci.append('username', username);
    podaci.append('password', password);
    podaci.append('mail', mail);
    podaci.append('city', city);
    podaci.append('country', country);
    podaci.append('type', type);
    if (picture) {
      podaci.append('image', picture, username);
    }
    console.log(podaci.get('image'));
   //console.log(data.picture);//slika je ok kad dodje do ovde
    return this.http.post<{poruka:string, korisnik: User}>(`${this.uri}/users/register`, podaci);
  }

  changePassword(user:User,newPassword:string){
    let _id=user._id;
    const data={
      _id:_id,
      newPassword:newPassword
    }
    // let data=new FormData();
    
    // data.append('username',username);
    // data.append('newPassword',newPassword);
    console.log(data);
    return this.http.post<{poruka:string, korisnik: User}>(`${this.uri}/users/changePassword`,data);

  }

  
  azurirajKorisnika(name:string,surname:string,username:string,password:string,mail:string,city:string,country:string,type:string){
    
    const podaci={
      name:name,
      surname:surname,
      username:username,
      password:password,
      mail:mail,
      city:city,
      country:country,
      type:type
    }
    console.log(podaci);
    return this.http.post(`${this.uri}/users/azurirajKorisnika`, podaci);
  }

  azurirajProfilnu(username,picture){
    let podaci = new FormData();
    podaci.append('username', username);
    if (picture) {
      podaci.append('image', picture, username);
    }
    console.log(podaci.get(username));
    return this.http.post<{poruka:string}>(`${this.uri}/users/azurirajProfilnu`, podaci);

  }

  dohvatiKorisnika(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.uri}/users/dohvatiKorisnika`, podaci);

  }

  dohvatiEmail(mail){
    const podaci={
      mail:mail
    }
    return this.http.post(`${this.uri}/users/dohvatiEmail`, podaci);
  }
  dohvatiSveKorisnike(){
    return this.http.get(`${this.uri}/users/dohvatiSveKorisnike`);
  }
  obrisiKorisnika(user){
    const podaci={
      username:user.username
    }
    return this.http.post<{poruka:string}>(`${this.uri}/users/obrisiKorisnika`, podaci);
  }


}
