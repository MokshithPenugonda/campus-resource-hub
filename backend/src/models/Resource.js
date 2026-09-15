import mongoose from "mongoose";

const resourceSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        subject:{
            type:String,
            required:true,
            trim:true
        },
        department:{
            type:String,
            required:true,
            enum:["CSE","ECE","EEE","IT","MMECH"]
        },
        semester:{
            type:Number,
            required:true,
            min:1,
            max:8
        },
        academicYear:{
            type:String,
            required:true,
            trim:true
        },
        resourceType:{
            type:String,
            required:true,
            enum:["Question Paper","Assignment"]
        },
        description:{
            type:String,
            trim:true,
            default:""
        },
        fileName:{
            type:String,
            required:true,
        },
        filePath:{
            type:String,
            required:true
        },
        uploadedBy:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        downloadCount:{
            type:Number,
            default:0
        }
    },
    {
        timestamps:true
    }
)


const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;