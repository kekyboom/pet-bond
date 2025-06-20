import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePetContext } from "../context/PetContext";

function QuickFilter() {
    const location = useLocation();
    const especie = new URLSearchParams(location.search).get("especie");
    const {filterPetsByTags} = usePetContext();

    const options = ["Santiago", "Macho", "Hembra", "Esterilizado", "Perro", "Gato"];
    const [activeTags, setActiveTags] = useState([]);

    useEffect(() => {
        if (especie) {
            const capitalized = especie.charAt(0).toUpperCase() + especie.slice(1).toLowerCase();
            setActiveTags([capitalized]);
            filterPetsByTags([capitalized]);
        }
    }, [especie]);

    const toggleTag = (tag) => {
        let updatedTags;
        if (activeTags.includes(tag)) {
            updatedTags  = activeTags.filter(t => t !== tag);
        } else {
            updatedTags = [...activeTags, tag];
        }
        setActiveTags(updatedTags);
        filterPetsByTags(updatedTags);
        console.log("Tags activos:", updatedTags);
    }
    return (
        <div className="container mx-auto px-15">
            <div className="flex flex-wrap gap-2 pt-10 pb-4">
                {options.map(option => (
                    <button key={option} onClick={()=> toggleTag(option)} 
                            className={`py-2 px-3 border rounded duration-500 hover:scale-102 hover:shadow-md cursor-pointer ${activeTags.includes(option)
                                        ? "bg-pbblue text-white border-pbblue"
                                        : "bg-white text-pbblue border-pbblue hover:text-pbdarkblue"
                                     }`}>
                        {option}
                    </button>
                ))}
                
            </div>
        </div>       
    )
}

export default QuickFilter;