import {Router} from "express";
import { createResource, getAllResources, getresourceById, myResources, download, updateResource, deleteResource} from "../controllers/resourcecontroller.js";
import { authenticateuser, authenticatestudent } from "../middlewear/authmiddlewear.js";
import upload from "../middlewear/uploadMiddlewear.js";

const router=Router();
router.post("/uploadResource",authenticateuser,upload.single("file"),createResource)
router.get("/getAllResources",authenticateuser,getAllResources);
router.get("/getresourceById/:id",authenticateuser,getresourceById);
router.get("/myResources",authenticatestudent,myResources)
router.get("/download/:id",authenticateuser,download);
router.put("/updateResource/:id",authenticateuser,updateResource);
router.delete("/deleteResource/:id",authenticateuser,deleteResource);

export default router;