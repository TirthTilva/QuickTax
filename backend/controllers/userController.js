import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../config/generateToken.js";

export const registerUser=asyncHandler(async(req,res)=>{
        const{name,email,password}=req.body;

        if(!name || !email || !password){
            res.status(400);
            throw new Error("Please Enter All Details")
        }

        const UserExist= await User.findOne({email});

        if(UserExist){
            res.status(400);
            throw new Error("User alredy Exist");
        }
        const user=await User.create({
            name,
            email,
            password,
        });

        if(user){
            res.status(201).json({
                _id: user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            });

        }else{
            res.status(400);
            throw new Error("Failed to create user")
        }
});


export const authUser =asyncHandler(async(req,res)=>{
    const{email,password}=req.body;

    const user=await User.findOne({email});

    if(user && (await user.matchPassword(password))){
            const token = generateToken(user._id);

            res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

         res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
        })
    }else{
        res.status(400);
        throw new Error("Invalid username or password");
    }


})

// export default {registerUser,authUser};