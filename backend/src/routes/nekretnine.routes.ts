import express from 'express';
import { upload_file } from '../storage';
import { NekretnineController } from '../controllers/nekretnine.controller';



const nekretnineRouter=express.Router();


nekretnineRouter.route('/searchNekretnine').post( 
    (req,res)=>new NekretnineController().searchNekretnine(req,res)
);

nekretnineRouter.route("/dodajNekretninu").post(upload_file.array('media'),(req, res)=> {
    new NekretnineController().dodajNekretninu(req, res);
});

nekretnineRouter.route('/dohvatiSveNekretnine').get( 
    (req,res)=>new NekretnineController().dohvatiSveNekretnine(req,res)
);

nekretnineRouter.route('/azurirajNekretninu').post( 
    (req,res)=>new NekretnineController().azurirajNekretninu(req,res)
);

nekretnineRouter.route('/dohvatiSveNekretnineKorisnika').post( 
    (req,res)=>new NekretnineController().dohvatiSveNekretnineKorisnika(req,res)
);

nekretnineRouter.route('/dohvatiSvePromovisaneNekretnine').get( 
    (req,res)=>new NekretnineController().dohvatiSvePromovisaneNekretnine(req,res)
);
nekretnineRouter.route('/dohvatiSveOdobreneNekretnine').get( 
    (req,res)=>new NekretnineController().dohvatiSveOdobreneNekretnine(req,res)
);

nekretnineRouter.route('/prinesiPonuduZaIznajmivanje').post( 
    (req,res)=>new NekretnineController().prinesiPonuduZaIznajmivanje(req,res)
);
nekretnineRouter.route('/prinesiPonuduZaPlacanje').post( 
    (req,res)=>new NekretnineController().prinesiPonuduZaPlacanje(req,res)
);
nekretnineRouter.route('/prihvatiPonudu').post( 
    (req,res)=>new NekretnineController().prihvatiPonudu(req,res)
);

nekretnineRouter.route('/odbaciPonudu').post( 
    (req,res)=>new NekretnineController().odbaciPonudu(req,res)
);
nekretnineRouter.route('/dohvatiNekretninuPoImenu').post( 
    (req,res)=>new NekretnineController().dohvatiNekretninuPoImenu(req,res)
);
nekretnineRouter.route('/obrisiNekretninu').get( 
    (req,res)=>new NekretnineController().obrisiNekretninu(req,res)
);
nekretnineRouter.route('/dohvatiNekretninuPoID').post( 
    (req,res)=>new NekretnineController().dohvatiNekretninuPoID(req,res)
);
nekretnineRouter.route('/azurirajSlike').post( upload_file.array('media'),
    (req,res)=>new NekretnineController().azurirajSlike(req,res)
);
nekretnineRouter.route('/obobriPonuduKaoAgent').post( 
    (req,res)=>new NekretnineController().obobriPonuduKaoAgent(req,res)
);
export default nekretnineRouter;