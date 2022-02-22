import { ObjectID } from "mongodb"

export class User{
    _id:ObjectID
    name:string
    surname:string
    picture:string
    username:string
    password:string
    mail:string
    city:string
    country:string
    type:number
}