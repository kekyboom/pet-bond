import { Router } from "express";
import { fetchPets, addPet, updatePetById, deletePetById, getPetsByUser} from "../controllers/pets.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

import { validatePetFields } from "../middlewares/pets.middleware.js";

const router = Router();

router.get("/", fetchPets);
router.get("/user",verifyToken, getPetsByUser)
router.post("/",verifyToken, validatePetFields, addPet);
router.put("/:id",verifyToken, validatePetFields, updatePetById);
router.delete("/:id",verifyToken, deletePetById);

export default router;
 