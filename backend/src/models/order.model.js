import mongoose from "mongoose";

const orederItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    image:{
        type:String,
        required:true
    }
})

const shippingAddressSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    streetAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipCode:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
})

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    clerkId:{
        type:String,
        required:true
    },
    orderItems:[orederItemSchema],

    shippingAddress:{
        type: shippingAddressSchema,
        required:true
    },
    paymentResult:{
        id:String,
        status:String,   
    },
    totalPrice:{
        type:Number,
        required:true,
        min:0
    },
    status:{
        type:String,
        enum:["pending","shipped","delivered"],
        default:"pending"
    },
    devliveryDate:{
        type:Date
    },
    shippedDate:{
        type:Date
    }

},{timestamp:true})

export const Order = mongoose.model("Order", orderSchema);