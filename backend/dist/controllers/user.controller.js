"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, "password": password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            const url = req.protocol + "://" + req.get("host");
            let picturePath = "";
            console.log(req.file);
            if (req.file != null) {
                console.log("Izabrana slika");
                picturePath = url + "/images/" + req.file.filename;
            }
            else {
                console.log("Otislo je u default");
                picturePath = url + "/images/og.png";
            }
            console.log(req.body.username);
            const korisnik = new user_1.default({
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
        };
        this.changePassword = (req, res) => {
            console.log(req.body);
            let _id = req.body._id;
            let lozinka = req.body.newPassword;
            console.log(req.body._id);
            console.log(req.body.newPassword);
            user_1.default.findOne({ _id: _id }, //trazimo u bazi usera
            (err, user) => {
                if (err)
                    console.log(err);
                else { //nasli smo usera
                    user_1.default.update({ _id: _id }, {
                        $set: { password: lozinka } //updateujemo lozinku
                    }, (err, k) => {
                        if (err)
                            console.log(err);
                        else { //ako nije doslo do greske ispise se sta treba
                            res.json({
                                poruka: 'Korisnik uspesno azuriran'
                            });
                        }
                    });
                }
            });
        };
        this.azurirajKorisnika = (req, res) => {
            let username = req.body.username;
            console.log(username);
            user_1.default.findOne({ username: username }, //trazimo u bazi usera
            (err, user) => {
                if (err)
                    console.log(err);
                else { //nasli smo usera
                    user_1.default.updateOne({ username: username }, {
                        $set: {
                            name: req.body.name,
                            surname: req.body.surname,
                            username: req.body.username,
                            city: req.body.city,
                            country: req.body.country,
                            mail: req.body.mail,
                            type: req.body.type,
                        },
                    }, (err, k) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json(user);
                        }
                    });
                }
            });
        };
        this.azurirajProfilnu = (req, res) => {
            const url = req.protocol + "://" + req.get("host");
            let profilnaPath = "";
            console.log(req.file);
            if (req.file != null) {
                profilnaPath = url + "/images/" + req.file.filename;
            }
            else {
                profilnaPath = url + "/images/og.png";
            }
            let username = req.body.username;
            user_1.default.findOne({ username: username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    user_1.default.updateOne({ username: username }, {
                        $set: { picture: profilnaPath }
                    }, (err, k) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json({
                                poruka: 'Profilna uspesno azurirana'
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
        this.dohvatiKorisnika = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.dohvatiEmail = (req, res) => {
            let mail = req.body.mail;
            user_1.default.findOne({ 'mail': mail }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.dohvatiSveKorisnike = (req, res) => {
            user_1.default.find({}, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.obrisiKorisnika = (req, res) => {
            console.log(req.body.username);
            user_1.default.deleteOne({ username: req.body.username }, function (err) {
                if (err)
                    console.log(err);
                else
                    res.json({ poruka: 'Korisnik uspesno obrisan' });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map