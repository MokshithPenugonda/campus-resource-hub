import {User} from"../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser=async(req,res)=>{
    try{
        const {name,email,password,department,semester,role}=req.body;
    if(!name||!email||!password||!role||!department||!semester){
        return res.status(400).json({message:"All the fields are required"})
    }
    if(role!=="student"&&role!=="admin"){
        return res.status(400).json({message:"Invalid role"})
    }
    const existingUser=await User.findOne({email});//we have to use {email} because email is a key in the User model
    if(existingUser){
        return res.status(400).json({message:"User already exists try logging in"})
    }
    if(semester<1 || semester>8){
        return res.status(400).json({message:"Semester should be between 1 and 8"})
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const user=await User.create({name,email,password:hashedpassword,department,semester,role});
    res.status(201).json({message:"User registered successfully"});
    }catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({message:"Internal server error"});
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:"Please enter the valid password"});
        }
        const payload={user_id:user._id,user_role:user.role};
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"});
        return res.status(200).json({message:"User loggedIn Successfully ",token});
    }catch(error){
        console.error("Error logging in user:", error);
        res.status(500).json({message:"Internal server error"});
    }
}
const getprofile=async(req,res)=>{
    try{
        const userid=req.user.user_id;
        const user=await User.findById(userid).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({user});
    }catch(error){
        console.error("Error fetching user profile:", error);
        res.status(500).json({message:"Internal server error"});
    }
}
export{registerUser,loginUser,getprofile}