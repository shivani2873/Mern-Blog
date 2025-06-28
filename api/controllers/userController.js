import User from "../models/userModel";
import { errorHandler } from "../utils/error.js";
import { bcryptjs } from 'bcryptjs'

export const test = (req, res) => {
    res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {
    // console.log(req.user);
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update thi user'));
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.bosy.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 to 20 characters'));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be in lowercase'));
        }
        if (req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username can only conatin letters & numbers'));
        }
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.bosy.username,
                email: req.body.email,
                profilePic: req.body.profilePic,
                password: req.body.password,
            },
        }, { new: true });
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (err) {
        next(err);
    }
}
export const deleteUser = async (req,res,next)=>{
    if(req.user.id!==req.params.userId){
        return next(errorHandler(403,'Yor are not allowed to delete this user'));
    }
    try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).jsno('user has been deleted');
    }catch(err){
        next(err);
    }
}
