import { IUpdateRecipe } from "@/types/updateRecipe.interface";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';
import { useCloseModal } from "./closeModal.hook";
import { toast } from "sonner";

const updateRecipe = async (recipe: IUpdateRecipe) => {
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}recipes/update`, {
        method: "PATCH",
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

export function useUpdateRecipe() {
    const queryClient = useQueryClient();
    const {dismiss } = useCloseModal();

    return useMutation({
        mutationFn: updateRecipe,
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ["fetchRecipes"],
                refetchType: "all"
            });
            dismiss();
            toast("Recipe Successfully Updated")
            console.log(response)
        },
        onError: (error) => {
            console.log(error)
        }
    });
}