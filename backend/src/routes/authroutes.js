import {Router} from "express";
import {registerUser,loginUser,getprofile} from "../controllers/authcontroller.js"
import {authenticateuser,authenticateadmin} from "../middlewear/authmiddlewear.js"
const router=Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",authenticateuser,getprofile);
export default router;