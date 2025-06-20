import { Router } from "express";
import { registerUser, loginUser, getUsers, getUserById } from "../controllers/auth.controller.js";
import { verifyToken, logRequest, checkRegisterFields, checkLoginFields } from "../middlewares/auth.middleware.js";

const router = Router(); 

router.use(logRequest); 

router.post("/usuarios", checkRegisterFields, registerUser);
router.post("/login", checkLoginFields, loginUser);
router.get("/usuarios", verifyToken, getUsers);
router.get("/usuarios/:id", verifyToken, getUserById);

export default router;