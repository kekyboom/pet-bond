import { Router } from "express";
import { registerUser, loginUser, getUsers } from "../controllers/auth.controller.js";
import { verifyToken, logRequest, checkRegisterFields, checkLoginFields } from "../middlewares/auth.middleware.js";

const router = Router(); 

router.use(logRequest); 

router.post("/usuarios", checkRegisterFields, registerUser);
router.post("/login", checkLoginFields, loginUser);

router.get("/usuarios", verifyToken, getUsers);

export default router;