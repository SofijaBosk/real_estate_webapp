import { ObjectID } from "mongodb"
import { User } from "./user"

export class Nekretnine{
    _id:ObjectID
    ime:string
    adresa:string
    grad:string
    opstina:string
    kategorija:string
    brojSpratova:number
    kvadratura:number
    brojSoba:number
    imaNamestaj:boolean
    izdajeProdaje:string 
    iznajmljivanjeDatumOd:Date
    iznajmljivanjeDatumDo:Date
    slike:string[]
    video:string[]
    cena:number
    vlasnik:string
    ponude:Array<Ponude>
    prihvacenePonude:Array<Ponude>
    odobrena:boolean
    promovisana:boolean
    prodata:boolean
}

export class Ponude{
    username:string
    iznajmljivanjeDatumOd:Date
    iznajmljivanjeDatumDo:Date
    nacinPlacanja:string
    tipPlacanja:string //iznamljivanje ili prodaja
    datumStvaranja:Date;
}