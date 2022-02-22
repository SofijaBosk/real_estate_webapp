import express from 'express';
import { upload_file } from '../storage';
import { UserController } from '../controllers/user.controller';
const userRouter=express.Router();

userRouter.route('/login').post( //Uspostavimo rutu
    (req,res)=>new UserController().login(req,res)
);

userRouter.route('/register').post(
    upload_file.single('image'),(req,res)=>new UserController().register(req,res)
)

userRouter.route('/changePassword').post(
    (req,res)=>new UserController().changePassword(req,res)
)
userRouter.route('/azurirajKorisnika').post(
    (req,res)=>new UserController().azurirajKorisnika(req,res)
)
userRouter.route('/azurirajProfilnu').post(
    upload_file.single('image'),(req,res)=>new UserController().azurirajProfilnu(req,res)
)
userRouter.route('/dohvatiKorisnika').post(
    (req,res)=>new UserController().dohvatiKorisnika(req,res)
)
userRouter.route('/dohvatiEmail').post(
    (req,res)=>new UserController().dohvatiEmail(req,res)
)
userRouter.route('/dohvatiSveKorisnike').get(
    (req,res)=>new UserController().dohvatiSveKorisnike(req,res)
)
userRouter.route('/obrisiKorisnika').post(
    (req,res)=>new UserController().obrisiKorisnika(req,res)
)

export default userRouter;