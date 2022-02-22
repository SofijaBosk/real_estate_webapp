
import express from "express";
import Nekretnina from '../models/nekretnine'
import User from '../models/user'

export class NekretnineController{

  azurirajNekretninu=(req: express.Request, res: express.Response)=>{
    Nekretnina.findOne({ _id: req.body._id }, (err, nekretnina) => {
      if (err) {
        console.log(err);
      } else if (!nekretnina) {
        res.json({ poruka: "Ne postoji nekretnina sa id: " + req.body._id });
      } else {
        let data = {
          ime: req.body.ime,
          adresa: req.body.adresa,
          grad: req.body.grad,
          opstina: req.body.opstina,
          kategorija: req.body.kategorija,
          brojSpratova: req.body.brojSpratova,
          kvadratura: req.body.kvadratura,
          brojSoba: req.body.brojSoba,
          imaNamestaj: req.body.imaNamestaj,
          izdajeProdaje: req.body.izdajeProdaje,
          cena: req.body.cena,
          vlasnik: req.body.vlasnik,
          prodana: ((req.body.prodana==null || req.body.promovisana==false)?false:true),
          odobrena:((req.body.odobrena==null ||req.body.odobrena==false)?false:true),
          promovisana:((req.body.promovisana==null ||req.body.promovisana==false)?false:true)
        };
        Nekretnina.findOneAndUpdate({ _id: req.body._id }, data, (err, n) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ poruka: "Nekretnina uspesno azurirana" });
          }
        });
      }
    });
  }


  dohvatiSveNekretnine= (req: express.Request, res: express.Response)=>{
    Nekretnina.find({}, (err, nek)=>{
        if(err) console.log(err);
        else res.json(nek)
    })
  }

  dohvatiSvePromovisaneNekretnine=(req: express.Request, res: express.Response)=>{
    Nekretnina.find({'promovisana':true,'odobrena':true}, (err, nek)=>{
        if(err) console.log(err);
        else res.json(nek)
    })
  }
  dohvatiSveOdobreneNekretnine=(req: express.Request, res: express.Response)=>{
    Nekretnina.find({'odobrena':true}, (err, nek)=>{
        if(err) console.log(err);
        else res.json(nek)
    })
  }


    searchNekretnine = (req: express.Request, res: express.Response) => {
        let grad = req.body.grad;
        let cenaOd = req.body.cenaOd;
        let cenaDo = req.body.cenaDo;
        
        let cena;
        if (cenaOd && cenaDo) {
            cena = { $gte: cenaOd, $lte: cenaDo };
        } else if (cenaOd) {
          cena = { $gte: cenaOd };
        } else if (cenaDo) {
          cena = { $lte: cenaDo };
        }
        console.log(cena);
        console.log(grad);
        
        if(cena && grad){
          Nekretnina.find({"grad":grad,"cena":cena,"odobrena":true}, (err, nekretnine) => {
            if (err) {
              console.log(err);
            } else {
              res.json(nekretnine);
            }
          });
        }
        else{
          if (grad) {
            Nekretnina.find({"grad":grad,"odobrena":true}, (err, nekretnine) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json(nekretnine);
                  }
                });
          }  
          if(cena){
            Nekretnina.find({'cena':cena,"odobrena":true}, (err, nekretnine) => {
              if (err) {
                console.log(err);
              } else {
                res.json(nekretnine);
              }
            });
          }
        } 
      };


      dodajNekretninu = (req: express.Request, res: express.Response) => {
        const url = req.protocol + "://" + req.get("host");
        let images: String[] = [];
        // let video: String[] = [];
        console.log("====  =====")
        console.log(req.files)
        if (!req.files || req.files==[]) {
          console.log('stigli smo ovde');
          images.push(url + "/images/nekretnina_og.jpg");
        } else {
          let files = req.files as Express.Multer.File[];
          files.forEach((file) => {
            let path = url + "/images/" + file.filename;
              images.push(path);
          });
        }
        if(images==null || images.length==0){
          console.log('stigli smo ovde');
          images.push(url + "/images/nekretnina_og.jpg");
        }
        console.log(images);
        let novaNekretnina = new Nekretnina({
          ime: req.body.ime,
          adresa: req.body.adresa,
          grad: req.body.grad,
          opstina: req.body.opstina,
          kategorija: req.body.kategorija,
          brojSpratova: req.body.brojSpratova,
          kvadratura: req.body.kvadratura,
          brojSoba: req.body.brojSoba,
          imaNamestaj: req.body.imaNamestaj,
          izdajeProdaje:req.body.izdajeProdaje,
          slike: images,
          cena: req.body.cena,
          vlasnik: req.body.vlasnik,
        });
        console.log("dodaj nekretninu:", novaNekretnina);
        novaNekretnina.save().then((n) => {
          res.status(200).json({
            poruka: "Nekretnina uspesno dodata",
          });
        });
      };
  
  
    dohvatiSveNekretnineKorisnika=(req: express.Request, res: express.Response)=>{
      Nekretnina.find({'vlasnik':req.body.username}, (err, nek)=>{
          if(err) console.log(err);
          else res.json(nek)
      })
    }

    // odobriNekretninu=(req: express.Request, res: express.Response)=>{
    //   Nekretnina.findOne({ _id: req.body._id }, (err, nekretnina) => {
    //     if (err) {
    //       console.log(err);
    //     } else if (!nekretnina) {
    //       res.json({ poruka: "Ne postoji nekretnina sa id: " + req.body._id });
    //     } else {
    //       Nekretnina.findOneAndUpdate({ _id: req.body._id }, data, (err, n) => {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           res.json({ poruka: "Nekretnina uspesno azurirana" });
    //         }
    //       });
    //     }
    //   });
    // }
    


    prinesiPonuduZaIznajmivanje=(req: express.Request, res: express.Response)=>{
      let datumOd = (req.body.iznajmljivanjeDatumOd) ? new Date(req.body.iznajmljivanjeDatumOd): null;
      let datumDo = (req.body.iznajmljivanjeDatumDo) ? new Date(req.body.iznajmljivanjeDatumDo) : null;
      Nekretnina.findOne({_id:req.body._id}, (err, nek)=>{
        console.log(nek);
        if(err) console.log(err);
        else{
          const podaci={
            username:req.body.username,
            iznajmljivanjeDatumOd:datumOd,
            iznajmljivanjeDatumDo:datumDo,
            tipPlacanja:'iznajmljivanje',
            datumStvaranja: new Date(),
            status:'nije odobrena'
          }
          Nekretnina.findOneAndUpdate({_id : req.body._id},
            {
              $push: {
                ponude: podaci,
              },
            },
            (err,k)=>{
              console.log(k);
              if(err) console.log(err);
              else{
                res.json({
                  poruka:'Ponuda uspesno poslata'
                })
            }
          });
        }
    })
    }

    prinesiPonuduZaPlacanje=(req: express.Request, res: express.Response)=>{
      Nekretnina.findOne({_id:req.body._id}, (err, nek)=>{
        console.log(nek);
        if(err) console.log(err);
        else{
          const podaci={
            username:req.body.username,
            nacinPlacanja:req.body.nacinPlacanja,
            tipPlacanja:'kupovina',
            datumStvaranja: new Date(),
            status:'nije odobrena'
          }
          Nekretnina.findOneAndUpdate({_id : req.body._id},
            {
              $push: {
                ponude: podaci,
              },
            },
            (err,k)=>{
              console.log(k);
              if(err) console.log(err);
              else{
                res.json({
                  poruka:'Ponuda uspesno poslata'
                })
            }
          });
        }
    })
    }







    prihvatiPonudu=(req: express.Request, res: express.Response)=>{//id nekretnine+ponuda
      let podaci=req.body.ponuda;
      let kupovina=false;
      console.log(podaci);
      console.log(req.body._id);
      if(podaci.tipPlacanja==='kupovina')kupovina=true;
      Nekretnina.findOne({_id:req.body._id}, (err, nek)=>{
        console.log(nek);
        if(err) console.log(err);
        else{
          Nekretnina.findOneAndUpdate({_id : req.body._id},
            {
              $push: {
                prihvacenePonude: podaci,
              },
              $set:{
                prodata:kupovina,
                // agencijskaPotvrda:false
              }
            },
            (err,k)=>{
              console.log(k);
              if(err) console.log(err);
              else{
                res.json({
                  poruka:'Ponuda uspesno primljena'
                })
            }
          });
        }
    })

    }

    odbaciPonudu=(req: express.Request, res: express.Response)=>{
      console.log(req.body._id);
      console.log(req.body.ponuda.datumStvaranja);
      Nekretnina.findOneAndUpdate({_id: req.body._id},
        {
          $pull:{ponude:{username: req.body.ponuda.username}},
        },
        (err,n)=>{
          if(err) console.log(err);
          else{
            console.log(n);
            res.json({
              poruka:'Uspesno odbijanje ponude'
            })
          } 
        });
      }

      dohvatiNekretninuPoImenu=(req: express.Request, res: express.Response)=>{
        Nekretnina.findOne({ime:req.body.ime}, (err, nek)=>{
            if(err) console.log(err);
            else res.json(nek)
        })
      }
      dohvatiNekretninuPoID=(req: express.Request, res: express.Response)=>{
        Nekretnina.findOne({_id:req.body._id}, (err, nek)=>{
            if(err) console.log(err);
            else res.json(nek)
        })
      }



      obrisiNekretninu=(req: express.Request, res: express.Response)=>{
        console.log(req.body._id);
        Nekretnina.deleteOne({_id: req.body._id}, function (err) {
          if (err) console.log(err);
          else res.json({poruka:'Nekretnina uspesno obrisana'});
        });    
      }
      // obrisiSvePonudeNekretnine=(req: express.Request, res: express.Response)=>{
      //   Nekretnina.findOneAndUpdate({_id: req.body._id},
      //     {
      //       $delete:{ponude},
      //     },
      //     (err,n)=>{
      //       if(err) console.log(err);
      //       else{
      //         console.log(n);
      //         res.json({
      //           poruka:'Uspesno brisanje ponuda'
      //         })
      //       } 
      //     });   
      // }


      azurirajSlike=(req: express.Request, res: express.Response)=>{

        const url = req.protocol + "://" + req.get("host");
        let images: String[] = [];
        let video: String[] = [];
        console.log("upload files-files:", req.files);
        if (req.files) {
          let files = req.files as Express.Multer.File[];
          files.forEach((file) => {
            let path = url + "/images/" + file.filename;
            if (file.filename.endsWith("mp4")) {
              video.push(path);
            } else {
              images.push(path);
            }
          });
        }
        console.log(images);
          let _id=req.body._id;
          
          Nekretnina.findOne({_id :_id},
                (err,nek)=>{
                    if(err) console.log(err);
                    else {
                      Nekretnina.updateOne({_id : _id},
                      {
                        $push:{slike: images}
                      },
                      (err,k)=>{
                        if(err) console.log(err);
                        else{
                          console.log(nek);
                        res.json({
                          poruka:'Slika uspesno dodata'
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


          obobriPonuduKaoAgent = (req: express.Request, res: express.Response) => {  
             console.log(req.body);
            Nekretnina.findOneAndUpdate({_id: req.body._id},
              {
                $pull:{prihvacenePonude:{username: req.body.stara.username}},
                
              },
              (err,n)=>{
                if(err) console.log(err);
                else{
                  Nekretnina.findOneAndUpdate({_id: req.body._id},
                    {
                      $push: {prihvacenePonude: req.body.nova},
                    },
                    (err,n)=>{
                      if(err) console.log(err);
                      else{
                        console.log(n);
                        res.json({
                          poruka:'Ponuda uspesno potvrdjena'
                        })
                      } 
                    });
                } 
              });
          }

}