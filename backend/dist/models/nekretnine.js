"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Nekretnina = new Schema({
    ime: {
        type: String
    },
    adresa: {
        type: String
    },
    grad: {
        type: String
    },
    opstina: {
        type: String
    },
    kategorija: {
        type: String
    },
    brojSpratova: {
        type: Number
    },
    kvadratura: {
        type: Number
    },
    brojSoba: {
        type: Number
    },
    imaNamestaj: {
        type: Boolean
    },
    izdajeProdaje: {
        type: String
    },
    slike: {
        type: Array
    },
    video: {
        type: Array
    },
    iznajmljivanjeDatumOd: {
        type: Date
    },
    iznajmljivanjeDatumDo: {
        type: Date
    },
    cena: {
        type: Number
    },
    vlasnik: {
        type: String
    },
    promovisana: {
        type: Boolean
    },
    prodata: {
        type: Boolean
    },
    ponude: {
        type: Array
    },
    prihvacenePonude: {
        type: Array
    },
    odobrena: {
        type: Boolean
    },
});
let Ponude = new Schema({
    status: {
        type: Boolean,
    }
});
exports.default = mongoose_1.default.model('Nekretnina', Nekretnina, 'nekretnine');
//# sourceMappingURL=nekretnine.js.map