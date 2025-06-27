import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup=async(req,res,next)=>{
    // console.log(req.body);
    const {username,email,password}=req.body;
    if(!username || !email || !password || username===''||email===''||password===''){
        // return res.status(400).json({message:"All fileds are required"});
        next(errorHandler(400,'All fields are required'));
    }
    const hashPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({
        username ,
        email ,
        password:hashPassword ,
    });
    try{
        await newUser.save();
        res.json('Signup Successful');
    }catch(err){
        // res.status(500).json({message:err.message});
        next(err);
    }
};
export const signin=async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password ||email===''||password===''){
        // return res.status(400).json({message:"All fileds are required"});
        next(errorHandler(400,'All fields are required'));
    }
    try{
        const validUser=await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'User not found'));
        }
        const validPass=bcryptjs.compareSync(password,validUser.password);
        if(!validPass){
            return next(errorHandler(400,'Invalid password'));
        }
        //JWT
        const token=jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        //to hide password secrest coding
        const {password,pass,...rest}=validUser._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly:true}).json(rest);
    }catch(err){
        next(err);
    }
}
export const google=async(req,res,next)=>{
    const {name,email,googlePhotoUrl}=req.body;
    try{
        const user=await User.findOne({email});
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password,...rest}=user._doc;
            res.status(200).cookie('access_token',token,{
              httpOnly:true
            }).json(rest);
        }else{
            const generatedPass= Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            // 0.2983sdss
            const hashPassword=bcryptjs.hashSync(generatedPass,10);
            const newUser=new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                //Shivani Gupta => shivanigupta28
                email,
                password:hashPassword,
                profilePic:googlePhotoUrl,
            });
            await newUser.save();
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password,...rest}=user._doc;
            res.status(200).cookie('access_token',token,{
              httpOnly:true
            }).json(rest);
        }
    }catch(err){
        next(err);
    }
}