"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storage_1 = require("../storage");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post(//Uspostavimo rutu
(req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post(storage_1.upload_file.single('image'), (req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/azurirajKorisnika').post((req, res) => new user_controller_1.UserController().azurirajKorisnika(req, res));
userRouter.route('/azurirajProfilnu').post(storage_1.upload_file.single('image'), (req, res) => new user_controller_1.UserController().azurirajProfilnu(req, res));
userRouter.route('/dohvatiKorisnika').post((req, res) => new user_controller_1.UserController().dohvatiKorisnika(req, res));
userRouter.route('/dohvatiEmail').post((req, res) => new user_controller_1.UserController().dohvatiEmail(req, res));
userRouter.route('/dohvatiSveKorisnike').get((req, res) => new user_controller_1.UserController().dohvatiSveKorisnike(req, res));
userRouter.route('/obrisiKorisnika').post((req, res) => new user_controller_1.UserController().obrisiKorisnika(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map