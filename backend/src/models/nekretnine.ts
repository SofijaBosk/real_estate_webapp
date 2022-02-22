import mongoose from "mongoose";

const Schema=mongoose.Schema;

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
    kategorija: { // {stan, kuca}
        type: String
    },
    brojSpratova: {//koji je sprat kod stanova
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
    vlasnik: { // username ili agencija
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
    prihvacenePonude:{ //Cuvamo vise korisnika za iznajmljivanje
        type:Array
    },
    odobrena: {
        type: Boolean
    },
});
let Ponude = new Schema({
    status:{
        type:Boolean,
    }
});

export default mongoose.model('Nekretnina', Nekretnina, 'nekretnine');