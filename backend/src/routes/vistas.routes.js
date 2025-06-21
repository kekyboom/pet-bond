import express from 'express';
import { postVista, getVistasPorUsuario } from '../controllers/vistas.controller.js';
import { verifyToken} from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post('/', postVista); 
router.get('/:userId', verifyToken, getVistasPorUsuario); 

export default router;
