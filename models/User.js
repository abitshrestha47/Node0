import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0,
    },
    code:{
        type:String,required:true,
    }
},{timestamps:true});

export const User=mongoose.model('users',userSchema);