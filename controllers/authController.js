import { User } from "../models/User.js";
import { compareHash, hashPassword } from "../utils/passwordUitls.js";
import jwt from 'jsonwebtoken';

const signupController=async(req,res,next)=>{
    const {username,email,password,phone,address,code}=req.body;

    //missing fields validations
    if(!username) return res.status(400).json({error:'Username is required!'});
    if(!email) return res.status(400).json({error:'Email is required!'});
    if(!password) return res.status(400).json({error:'Password is required!'});
    if(!phone) return res.status(400).json({error:'Phone is required!'});
    if(!address) return res.status(400).json({error:'Address is required!'});
    if(!code) return res.status(400).json({error:'Code is required!'});

    try {
        const user=await User.findOne({email});
        if(user){
            return res.status(409).json({success:false,error:'Email is already taken!'});
        } 
        const hashedPassword=await hashPassword(password);
        const createdUser=await new User({username,email,password:hashedPassword,phone,address,code}).save();
        res.status(200).json({
            success:true,
            message:'User signed up successfully.'
        });
    } catch (error) {
        return next(error);
    }
}

const loginController=async(req,res,next)=>{
    const {email,password}=req.body;

    //missing validations
    if(!email || !password) return res.status(400).json({error:'Either email or password is invalid!'})

    try {
        const checkUser=await User.findOne({email});
        if(!checkUser){
            return res.status(404).json({error:'Email not found!'});
        }
        const valid=await compareHash(password,checkUser.password);
        if(!valid){
            return res.status(401).json({error:'Password is invalid!'});
        }
        const token=jwt.sign({_id:checkUser._id},process.env.JWT_SECRET,{
            expiresIn:'1hr',
        });
         res.status(200).json({success:true,message:'Login successful.',user:{
            username:checkUser.username,
            email:checkUser.email,
            phone:checkUser.phone,
            address:checkUser.address,
            role:checkUser.role
            },
            token:token
        });
    } catch (error) {
        return next(error);
    }
}

export {signupController,loginController};