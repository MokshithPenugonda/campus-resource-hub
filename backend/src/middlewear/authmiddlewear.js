import jwt from "jsonwebtoken";

const authenticateadmin=(req,res,next)=>{
    try{
        const bearertoken=req.headers.authorization;
        if(!bearertoken){
            return res.status(401).json({message:"Bearer token is missing"})
        }
        if(!bearertoken.startsWith("Bearer ")){
            return res.status(401).json({message:"Invalid token"})
        }
        const token=bearertoken.split(" ")[1];
        const decodedversion=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decodedversion;
        if(decodedversion.user_role!=="admin"){
            return res.status(403).json({message:"You are not authorized to access this resource"});
        }
        if(decodedversion.user_role==="admin"){
            next();
        }
    }catch(error){
        console.error(error.message);
        res.status(401).json({message:"Invalid token or expired token"});;
    }
}

const authenticatestudent=(req,res,next)=>{
    try{
        const bearertoken=req.headers.authorization;
        if(!bearertoken){
            return res.status(401).json({message:"Bearer token is missing"})
        }
        if(!bearertoken.startsWith("Bearer ")){
            return res.status(401).json({message:"Invalid token"})
        }
        const token=bearertoken.split(" ")[1];
        const decodedversion=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decodedversion;
        if(decodedversion.user_role!=="student"){
            return res.status(403).json({message:"You are not authorized to access this resource"});
        }
        if(decodedversion.user_role==="student"){
            next();
        }
    }catch(error){
        console.error(error.message);
        res.status(401).json({message:"Invalid token or expired token"});;
    }
}

const authenticateuser=(req,res,next)=>{
    try{
        const bearertoken=req.headers.authorization;
        if(!bearertoken){
            return res.status(401).json({message:"Bearer token is missing"});
        }
        if(!bearertoken.startsWith("Bearer ")){
            return res.status(401).json({message:"Invalid token"})
        }
        const token=bearertoken.split(" ")[1];
        const decodedversion=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decodedversion;
        
        next();
    }catch(error){
        console.error(error.message);
        return res.status(401).json({message:"Invalid token or expired token"});
    }
}

export {authenticateadmin,authenticatestudent,authenticateuser}