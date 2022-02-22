"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storage_1 = require("../storage");
const nekretnine_controller_1 = require("../controllers/nekretnine.controller");
const nekretnineRouter = express_1.default.Router();
nekretnineRouter.route('/searchNekretnine').post((req, res) => new nekretnine_controller_1.NekretnineController().searchNekretnine(req, res));
nekretnineRouter.route("/dodajNekretninu").post(storage_1.upload_file.array('media'), (req, res) => {
    new nekretnine_controller_1.NekretnineController().dodajNekretninu(req, res);
});
nekretnineRouter.route('/dohvatiSveNekretnine').get((req, res) => new nekretnine_controller_1.NekretnineController().dohvatiSveNekretnine(req, res));
nekretnineRouter.route('/azurirajNekretninu').post((req, res) => new nekretnine_controller_1.NekretnineController().azurirajNekretninu(req, res));
nekretnineRouter.route('/dohvatiSveNekretnineKorisnika').post((req, res) => new nekretnine_controller_1.NekretnineController().dohvatiSveNekretnineKorisnika(req, res));
nekretnineRouter.route('/dohvatiSvePromovisaneNekretnine').get((req, res) => new nekretnine_controller_1.NekretnineController().dohvatiSvePromovisaneNekretnine(req, res));
nekretnineRouter.route('/dohvatiSveOdobreneNekretnine').get((req, res) => new nekretnine_controller_1.NekretnineController().dohvatiSveOdobreneNekretnine(req, res));
nekretnineRouter.route('/prinesiPonuduZaIznajmivanje').post((req, res) => new nekretnine_controller_1.NekretnineController().prinesiPonuduZaIznajmivanje(req, res));
nekretnineRouter.route('/prinesiPonuduZaPlacanje').post((req, res) => new nekretnine_controller_1.NekretnineController().prinesiPonuduZaPlacanje(req, res));
nekretnineRouter.route('/prihvatiPonudu').post((req, res) => new nekretnine_controller_1.NekretnineController().prihvatiPonudu(req, res));
nekretnineRouter.route('/odbaciPonudu').post((req, res) => new nekretnine_controller_1.NekretnineController().odbaciPonudu(req, res));
nekretnineRouter.route('/dohvatiNekretninuPoImenu').post((req, res) => new nekretnine_controller_1.NekretnineController().dohvatiNekretninuPoImenu(req, res));
nekretnineRouter.route('/obrisiNekretninu').get((req, res) => new nekretnine_controller_1.NekretnineController().obrisiNekretninu(req, res));
nekretnineRouter.route('/dohvatiNekretninuPoID').post((req, res) => new nekretnine_controller_1.NekretnineController().dohvatiNekretninuPoID(req, res));
nekretnineRouter.route('/azurirajSlike').post(storage_1.upload_file.array('media'), (req, res) => new nekretnine_controller_1.NekretnineController().azurirajSlike(req, res));
nekretnineRouter.route('/obobriPonuduKaoAgent').post((req, res) => new nekretnine_controller_1.NekretnineController().obobriPonuduKaoAgent(req, res));
exports.default = nekretnineRouter;
//# sourceMappingURL=nekretnine.routes.js.map