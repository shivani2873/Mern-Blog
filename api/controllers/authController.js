import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs';

export const signup=async(req,res)=>{
    // console.log(req.body);
    const {username,email,password}=req.body;
    if(!username || !email || !password || username===''||email===''||password===''){
        return res.status(400).json({message:"All fileds are required"});
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
        res.status(500).json({message:err.message});
    }
}