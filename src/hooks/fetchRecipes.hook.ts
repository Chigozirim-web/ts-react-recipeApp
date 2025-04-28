import { IRecipe } from "@/types/recipe.interface";
import { IResponse } from "@/types/response.interface";
import { useQuery } from "@tanstack/react-query";

const fetchRecipes = async (): Promise<IResponse<IRecipe[]>> => {
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}recipes/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if(!response.ok) {
        throw new Error("Network response not OK")
    }

    return await response.json();
}

export function useFetchRecipes(params: object) {
    return useQuery({
        queryKey:["fetchRecipes"],
        queryFn: fetchRecipes
    })
}