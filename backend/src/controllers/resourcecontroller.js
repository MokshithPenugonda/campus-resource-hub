import Resource from "../models/Resource.js";
import mongoose from "mongoose";
import fs from "fs";

const createResource=async (req,res)=>{
    try{
        const {title,subject,department,semester,academicYear,resourceType,description}=req.body;
        if(!title||!subject||!department||!semester||!academicYear||!resourceType){
            return res.status(400).json({message:"all the fields are required"});
        }
        if(!req.file){
            return res.status(400).json({message:"Pdf file is required"})
        }
        const fileName=req.file.filename;
        const filePath=req.file.path;
        const uploadedBy=req.user.user_id;
        const resource=await Resource.create({title,subject,department,semester,academicYear,resourceType,description,fileName,filePath,uploadedBy})
        return res.status(201).json({message:"Resource added successfully",resource})
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

const getAllResources=async(req,res)=>{
    try{
        const {department,semester,subject,resourceType,academicYear}=req.query;
        let{page=1,limit=10}=req.query;
        if(page){
            page=Number(page);
        }
        if(limit){
            limit=Number(limit);
        }
        const filter={};
        if(department){
            filter.department=department;
        }
        if(semester){
            filter.semester=Number(semester);
        }
        if(subject){
            filter.subject=subject;
        }
        if(resourceType){
            filter.resourceType=resourceType;
        }
        if(academicYear){
            filter.academicYear=academicYear;
        }
        const skip=(page-1)*limit;
        const resources=await Resource.find(filter).skip(skip).limit(limit).populate("uploadedBy","-password");
        let totalResources=await Resource.countDocuments(filter);
        let totalPages=Math.ceil(totalResources/limit);
        res.status(200).json({"resources":resources,"currentPage":page,"limit":limit,"totalResources":totalResources,"totalPages":totalPages})
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"Internal server error try again after some time"})
    }
}

const getresourceById=async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            return res.status(400).json({message:"Resource Id is required"})
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid resource ID"});
        }
        const resource=await Resource.findById(id).populate("uploadedBy","-password");
        if(!resource){
            return res.status(404).json({message:"Resource not found"});
        }
        return res.status(200).json({resource});
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Internal server error try again after some time"})
    }
}

const myResources=async(req,res)=>{
    try{
        const userId=req.user.user_id;
        const resources=await Resource.find({uploadedBy:userId}).populate("uploadedBy","-password");
        return res.status(200).json({resources})
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Internal Server error try after some time"})
    }
}
const download=async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            return res.status(400).json({message:"Resource Id is required"})
        }
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message:"Invalid resource ID"})
        }
        const resource=await Resource.findById(id);
        if(!resource){
            return res.status(404).json({message:"Resource not found"});
        }
        resource.downloadCount+=1;
        await resource.save();
        return res.download(resource.filePath);
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Internal server error try again after some time"})
    }
}

const updateResource=async (req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            return res.status(400).json({message:"Resource Id is required"})
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid resource ID"});
        }
        const {title,subject,department,semester,academicYear,resourceType,description}=req.body;
        const updates={};
        if(title) updates.title=title;
        if(subject) updates.subject=subject;
        if(department) updates.department=department;
        if(semester) updates.semester=semester;
        if(academicYear) updates.academicYear=academicYear;
        if(resourceType) updates.resourceType=resourceType;
        if(description) updates.description=description;
        const userId=req.user.user_id;
        const resource=await Resource.findById(id);
        if(!resource){
            return res.status(404).json({message:"Resource not found"});
        }
        if(!resource.uploadedBy.equals(userId)){
            return res.status(403).json({message:"You are not authorized to update this resource"});
        }
        const updatedResource=await Resource.findByIdAndUpdate(id,updates,{new:true,runValidators: true}).populate("uploadedBy","-password");
        return res.status(200).json({message:"Resource updated successfully",updatedResource})
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:error.message})
    }
}
const deleteResource=async (req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            return res.status(400).json({message:"Resource Id is required"})
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid resource ID"});
        }
        const resource=await Resource.findById(id);
        if(!resource){
            return res.status(404).json({message:"Resource not found"});
        }
        const userId=req.user.user_id;
        if(!resource.uploadedBy.equals(userId)){
            return res.status(403).json({message:"You are not authorized to delete this resource"});
        }
        await fs.promises.unlink(resource.filePath);
        await Resource.findByIdAndDelete(id);
        return res.status(200).json({message:"Resource deleted successfully"})
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Internal server error try again after some time"})
    }
}

export {createResource, getAllResources, getresourceById, myResources, download,updateResource, deleteResource}