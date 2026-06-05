import mongoose from "mongoose";

const prodiuctSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    averageRating:{
        type:Number,
        min:0,
        max:5,
        default:0
    },
    totlereviews:{
        type:Number,
        default:0
    }
}, {timestamps:true})

export const Product = mongoose.model("Product", prodiuctSchema);