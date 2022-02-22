"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekretnineController = void 0;
const nekretnine_1 = __importDefault(require("../models/nekretnine"));
class NekretnineController {
    constructor() {
        this.azurirajNekretninu = (req, res) => {
            nekretnine_1.default.findOne({ _id: req.body._id }, (err, nekretnina) => {
                if (err) {
                    console.log(err);
                }
                else if (!nekretnina) {
                    res.json({ poruka: "Ne postoji nekretnina sa id: " + req.body._id });
                }
                else {
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
                        prodana: ((req.body.prodana == null || req.body.promovisana == false) ? false : true),
                        odobrena: ((req.body.odobrena == null || req.body.odobrena == false) ? false : true),
                        promovisana: ((req.body.promovisana == null || req.body.promovisana == false) ? false : true)
                    };
                    nekretnine_1.default.findOneAndUpdate({ _id: req.body._id }, data, (err, n) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({ poruka: "Nekretnina uspesno azurirana" });
                        }
                    });
                }
            });
        };
        this.dohvatiSveNekretnine = (req, res) => {
            nekretnine_1.default.find({}, (err, nek) => {
                if (err)
                    console.log(err);
                else
                    res.json(nek);
            });
        };
        this.dohvatiSvePromovisaneNekretnine = (req, res) => {
            nekretnine_1.default.find({ 'promovisana': true, 'odobrena': true }, (err, nek) => {
                if (err)
                    console.log(err);
                else
                    res.json(nek);
            });
        };
        this.dohvatiSveOdobreneNekretnine = (req, res) => {
            nekretnine_1.default.find({ 'odobrena': true }, (err, nek) => {
                if (err)
                    console.log(err);
                else
                    res.json(nek);
            });
        };
        this.searchNekretnine = (req, res) => {
            let grad = req.body.grad;
            let cenaOd = req.body.cenaOd;
            let cenaDo = req.body.cenaDo;
            let cena;
            if (cenaOd && cenaDo) {
                cena = { $gte: cenaOd, $lte: cenaDo };
            }
            else if (cenaOd) {
                cena = { $gte: cenaOd };
            }
            else if (cenaDo) {
                cena = { $lte: cenaDo };
            }
            console.log(cena);
            console.log(grad);
            if (cena && grad) {
                nekretnine_1.default.find({ "grad": grad, "cena": cena, "odobrena": true }, (err, nekretnine) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(nekretnine);
                    }
                });
            }
            else {
                if (grad) {
                    nekretnine_1.default.find({ "grad": grad, "odobrena": true }, (err, nekretnine) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json(nekretnine);
                        }
                    });
                }
                if (cena) {
                    nekretnine_1.default.find({ 'cena': cena, "odobrena": true }, (err, nekretnine) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json(nekretnine);
                        }
                    });
                }
            }
        };
        this.dodajNekretninu = (req, res) => {
            const url = req.protocol + "://" + req.get("host");
            let images = [];
            // let video: String[] = [];
            console.log("====  =====");
            console.log(req.files);
            if (!req.files || req.files == []) {
                console.log('stigli smo ovde');
                images.push(url + "/images/nekretnina_og.jpg");
            }
            else {
                let files = req.files;
                files.forEach((file) => {
                    let path = url + "/images/" + file.filename;
                    images.push(path);
                });
            }
            if (images == null || images.length == 0) {
                console.log('stigli smo ovde');
                images.push(url + "/images/nekretnina_og.jpg");
            }
            console.log(images);
            let novaNekretnina = new nekretnine_1.default({
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
        this.dohvatiSveNekretnineKorisnika = (req, res) => {
            nekretnine_1.default.find({ 'vlasnik': req.body.username }, (err, nek) => {
                if (err)
                    console.log(err);
                else
                    res.json(nek);
            });
        };
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
        this.prinesiPonuduZaIznajmivanje = (req, res) => {
            let datumOd = (req.body.iznajmljivanjeDatumOd) ? new Date(req.body.iznajmljivanjeDatumOd) : null;
            let datumDo = (req.body.iznajmljivanjeDatumDo) ? new Date(req.body.iznajmljivanjeDatumDo) : null;
            nekretnine_1.default.findOne({ _id: req.body._id }, (err, nek) => {
                console.log(nek);
                if (err)
                    console.log(err);
                else {
                    const podaci = {
                        username: req.body.username,
                        iznajmljivanjeDatumOd: datumOd,
                        iznajmljivanjeDatumDo: datumDo,
                        tipPlacanja: 'iznajmljivanje',
                        datumStvaranja: new Date(),
                        status: 'nije odobrena'
                    };
                    nekretnine_1.default.findOneAndUpdate({ _id: req.body._id }, {
                        $push: {
                            ponude: podaci,
                        },
                    }, (err, k) => {
                        console.log(k);
                        if (err)
                            console.log(err);
                        else {
                            res.json({
                                poruka: 'Ponuda uspesno poslata'
                            });
                        }
                    });
                }
            });
        };
        this.prinesiPonuduZaPlacanje = (req, res) => {
            nekretnine_1.default.findOne({ _id: req.body._id }, (err, nek) => {
                console.log(nek);
                if (err)
                    console.log(err);
                else {
                    const podaci = {
                        username: req.body.username,
                        nacinPlacanja: req.body.nacinPlacanja,
                        tipPlacanja: 'kupovina',
                        datumStvaranja: new Date(),
                        status: 'nije odobrena'
                    };
                    nekretnine_1.default.findOneAndUpdate({ _id: req.body._id }, {
                        $push: {
                            ponude: podaci,
                        },
                    }, (err, k) => {
                        console.log(k);
                        if (err)
                            console.log(err);
                        else {
                            res.json({
                                poruka: 'Ponuda uspesno poslata'
                            });
                        }
                    });
                }
            });
        };
        this.prihvatiPonudu = (req, res) => {
            let podaci = req.body.ponuda;
            let kupovina = false;
            console.log(podaci);
            console.log(req.body._id);
            if (podaci.tipPlacanja === 'kupovina')
                kupovina = true;
            nekretnine_1.default.findOne({ _id: req.body._id }, (err, nek) => {
                console.log(nek);
                if (err)
                    console.log(err);
                else {
                    nekretnine_1.default.findOneAndUpdate({ _id: req.body._id }, {
                        $push: {
                            prihvacenePonude: podaci,
                        },
                        $set: {
                            prodata: kupovina,
                            // agencijskaPotvrda:false
                        }
                    }, (err, k) => {
                        console.log(k);
                        if (err)
                            console.log(err);
                        else {
                            res.json({
                                poruka: 'Ponuda uspesno primljena'
                            });
                        }
                    });
                }
            });
        };
        this.odbaciPonudu = (req, res) => {
            console.log(req.body._id);
            console.log(req.body.ponuda.datumStvaranja);
            nekretnine_1.default.findOneAndUpdate({ _id: req.body._id }, {
                $pull: { ponude: { username: req.body.ponuda.username } },
            }, (err, n) => {
                if (err)
                    console.log(err);
                else {
                    console.log(n);
                    res.json({
                        poruka: 'Uspesno odbijanje ponude'
                    });
                }
            });
        };
        this.dohvatiNekretninuPoImenu = (req, res) => {
            nekretnine_1.default.findOne({ ime: req.body.ime }, (err, nek) => {
                if (err)
                    console.log(err);
                else
                    res.json(nek);
            });
        };
        this.dohvatiNekretninuPoID = (req, res) => {
            nekretnine_1.default.findOne({ _id: req.body._id }, (err, nek) => {
                if (err)
                    console.log(err);
                else
                    res.json(nek);
            });
        };
        this.obrisiNekretninu = (req, res) => {
            console.log(req.body._id);
            nekretnine_1.default.deleteOne({ _id: req.body._id }, function (err) {
                if (err)
                    console.log(err);
                else
                    res.json({ poruka: 'Nekretnina uspesno obrisana' });
            });
        };
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
        this.azurirajSlike = (req, res) => {
            const url = req.protocol + "://" + req.get("host");
            let images = [];
            let video = [];
            console.log("upload files-files:", req.files);
            if (req.files) {
                let files = req.files;
                files.forEach((file) => {
                    let path = url + "/images/" + file.filename;
                    if (file.filename.endsWith("mp4")) {
                        video.push(path);
                    }
                    else {
                        images.push(path);
                    }
                });
            }
            console.log(images);
            let _id = req.body._id;
            nekretnine_1.default.findOne({ _id: _id }, (err, nek) => {
                if (err)
                    console.log(err);
                else {
                    nekretnine_1.default.updateOne({ _id: _id }, {
                        $push: { slike: images }
                    }, (err, k) => {
                        if (err)
                            console.log(err);
                        else {
                            console.log(nek);
                            res.json({
                                poruka: 'Slika uspesno dodata'
                            });
                        }
                    });
                    // user.save().then((noviKorisnik) => {
                    //   res.status(200).json({
                    //     poruka: "Korisnik uspesno azuriran"
                    //   });
                    // });
                }
            });
        };
        this.obobriPonuduKaoAgent = (req, res) => {
            console.log(req.body);
            nekretnine_1.default.findOneAndUpdate({ _id: req.body._id }, {
                $pull: { prihvacenePonude: { username: req.body.stara.username } },
            }, (err, n) => {
                if (err)
                    console.log(err);
                else {
                    nekretnine_1.default.findOneAndUpdate({ _id: req.body._id }, {
                        $push: { prihvacenePonude: req.body.nova },
                    }, (err, n) => {
                        if (err)
                            console.log(err);
                        else {
                            console.log(n);
                            res.json({
                                poruka: 'Ponuda uspesno potvrdjena'
                            });
                        }
                    });
                }
            });
        };
    }
}
exports.NekretnineController = NekretnineController;
//# sourceMappingURL=nekretnine.controller.js.map