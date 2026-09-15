import mongoose from "mongoose"

const userschema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trmn:true
        },
        password:{
            type:String,
            required:true,
            minLength:6               
        },
        department:{
            type:String,
            enum:["CSE","IT","ECE","EEE","MECH"]
        },
        semester:{
            type:Number,
            min:1,
            max:8,
            required:true
        },
        role:{
            type:String,
            required:true,
            enum:["student","admin"]
        }
    },
    {
        timestamps:true
    }
)

const User=mongoose.model("User",userschema)

export {User}