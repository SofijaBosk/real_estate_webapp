import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import User from '../models/user'


export class UserController{
    
  login=(req:express.Request,res:express.Response)=>{
      let username=req.body.username;
      let password=req.body.password;


      User.findOne({'username':username,"password":password},
          (err,user)=>{
              if(err) console.log(err);
              else res.json(user);
          })

  }
  register=(req:express.Request,res:express.Response)=>{
  
      
      const url = req.protocol + "://" + req.get("host");
      let picturePath = "";
      console.log(req.file);
      if (req.file!=null) {
          console.log("Izabrana slika");
          picturePath = url + "/images/" + req.file.filename;
        
      } else {
          console.log("Otislo je u default");
          picturePath = url + "/images/og.png";
      }
      console.log(req.body.username);
      const korisnik = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        city: req.body.city,
        country: req.body.country,
        mail: req.body.mail,
        type: req.body.type,
        picture: picturePath,
      });
      console.log(korisnik);
      korisnik.save().then((noviKorisnik) => {
        res.status(200).json({
          poruka: "Korisnik uspesno registrovan",
          korisnik: noviKorisnik,
        });
      });
  }


  changePassword=(req: express.Request, res: express.Response)=>{
    console.log(req.body);
    let _id=req.body._id;
    let lozinka=req.body.newPassword;
    console.log(req.body._id);
    console.log(req.body.newPassword);
    User.findOne({_id :_id},//trazimo u bazi usera
          (err,user)=>{
              if(err) console.log(err);
              else {//nasli smo usera
                User.update({_id : _id},
                {
                  $set:{password:lozinka} //updateujemo lozinku
                },
                (err,k)=>{
                  if(err) console.log(err);
                  else{ //ako nije doslo do greske ispise se sta treba
                  res.json({
                    poruka:'Korisnik uspesno azuriran'
                  })
                }
              })
              }
          })

  }






  azurirajKorisnika=(req: express.Request, res: express.Response)=>{ //Moramo odvojeno sliku da promenimo
      let username=req.body.username;
      console.log(username);
      User.findOne({username :username},//trazimo u bazi usera
        (err,user)=>{
            if(err) console.log(err);
            else {//nasli smo usera
              User.updateOne({username : username},
              {
                $set: {
                  name: req.body.name,
                  surname: req.body.surname,
                  username: req.body.username,
                  city: req.body.city,
                  country: req.body.country,
                  mail: req.body.mail,
                  type: req.body.type,
                },
              },
              (err,k)=>{
                if(err) console.log(err);
                else{
                  res.json(user)
              }
            });
            }
        });
      }



      azurirajProfilnu=(req: express.Request, res: express.Response)=>{

      const url = req.protocol + "://" + req.get("host");
      let profilnaPath = "";
      console.log(req.file);
      if (req.file!=null) {
        profilnaPath = url + "/images/" + req.file.filename;
        
      } else {
        profilnaPath = url + "/images/og.png";
      }

        let username=req.body.username;
        User.findOne({username :username},
              (err,user)=>{
                  if(err) console.log(err);
                  else {
                    User.updateOne({username : username},
                    {
                      $set:{picture:profilnaPath}
                    },
                    (err,k)=>{
                      if(err) console.log(err);
                      else{
                      res.json({
                        poruka:'Profilna uspesno azurirana'
                      })
                    }
                  })
                  
                  // user.save().then((noviKorisnik) => {
                  //   res.status(200).json({
                  //     poruka: "Korisnik uspesno azuriran"
                  //   });
                  // });
                }
              });
      }


      dohvatiKorisnika=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;

      User.findOne({'username':username},
          (err,user)=>{
              if(err) console.log(err);
              else res.json(user);
          })
      }



      dohvatiEmail=(req: express.Request, res: express.Response)=>{
        let mail=req.body.mail;
        User.findOne({'mail':mail},
        (err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
      }


      dohvatiSveKorisnike=(req: express.Request, res: express.Response)=>{
        User.find({}, (err, user)=>{
          if(err) console.log(err);
          else res.json(user)
        })
      }


      obrisiKorisnika=(req: express.Request, res: express.Response)=>{
        console.log(req.body.username);
        User.deleteOne({username: req.body.username}, function (err) {
          if (err) console.log(err);
          else res.json({poruka:'Korisnik uspesno obrisan'});
        });
        
      }




}