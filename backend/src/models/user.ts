import mongoose from "mongoose";

const Schema=mongoose.Schema;

let User=new Schema(
    {
        name:{
            type: String
        },
        surname:{
            type:String
        },
        username:{
            type:String
        },
        password:{
            type:String
        },
        picture:{
            type:String
        },
        mail:{
            type:String
        },
        city:{
            type:String
        },
        country:{
            type:String
        },
        type:{//0-admin,1-odobren user,2-agent, 3-ceka da bude odobren
            type:Number
        }
    }
);

export default mongoose.model("User",User,"users");