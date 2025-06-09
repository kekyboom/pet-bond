import { useContext } from "react";
import { PetContext } from "../context/PetContext";

export const usePetContext = () => {
  return useContext(PetContext);
};