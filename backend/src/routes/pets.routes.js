import { Router } from "express";
import { fetchPets, addPet, updatePetById, deletePetById, getPetsByUser} from "../controllers/pets.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

import { validatePetFields } from "../middlewares/pets.middleware.js";

const router = Router();

router.get("/", fetchPets);
router.get("/user",verifyToken, getPetsByUser)
router.put("/:id",verifyToken, validatePetFields, updatePetById);
router.delete("/:id",verifyToken, deletePetById);
router.post("/", verifyToken, upload.single("imagen"), validatePetFields, addPet);

export default router;
 