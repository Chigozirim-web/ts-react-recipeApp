import { IRecipe } from "@/types/recipe.interface";
import { IResponse } from "@/types/response.interface";
import { useMutation } from "@tanstack/react-query";

const createRecipe = async (recipe: IRecipe) => {
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}recipes/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe)
    })

    if(!response.ok) {
        throw new Error("Network response not OK")
    }

    return await response.json();
}

export function useCreateRecipe() {
    return useMutation({
        mutationFn: createRecipe,
        onSuccess:  (response: IResponse<IRecipe>) => {
            console.log(response)
        },
        onError: (error) => {
            console.log(error)
        }
    });
}