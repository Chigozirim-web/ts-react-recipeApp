import { FC, ReactElement, SetStateAction, useEffect, useState } from "react";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "../ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircleIcon, TrashIcon }  from '@heroicons/react/24/solid';
import { IRecipe, RecipeCategory, RecipeMeal } from "@/types/recipe.interface";
import { toast } from "sonner";
import { IUpdateRecipe } from "@/types/updateRecipe.interface";
import { useUpdateRecipe } from '@/hooks/updateRecipe.hook';
import { useCloseModal } from "@/hooks/closeModal.hook";
import { useQueryClient } from '@tanstack/react-query';

export const UpdateRecipeView: FC<IRecipe> = (props): ReactElement => {
    const { name, ingredients, category, meal, preparationTime, _id } = props;
    const [updatedRecipe, setUpdatedRecipe] = useState<IUpdateRecipe>(
        {
            _id: _id ?? "", //but it will always have id though since it's fetched from DB
            name: name,
            ingredients: ingredients,
            category: category,
            meal: meal,
            preparationTime: preparationTime
        }
    );
    const [inputValue, setInputValue] = useState<string>("");
    const { mutate, isSuccess } = useUpdateRecipe();
    
    //const queryClient = useQueryClient();
    const {dismiss } = useCloseModal();

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUpdatedRecipe(prevRecipe => ({...prevRecipe, [name]: value}))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCheckedChange = (name: string, value: any[]) => {
        setUpdatedRecipe(prevRecipe => ({...prevRecipe, [name]: value}))
    }
    
    const addNewIngredient = () => {
        if(inputValue !== ""){    
            const tempIngredients = updatedRecipe.ingredients ?? [];
            tempIngredients.push(inputValue);
            setUpdatedRecipe(prevRecipe => ({...prevRecipe, ["ingredients"]: tempIngredients}))
        }
        setInputValue("");
    };

    const deleteIngredient = (index: number) => {
        const tempIngredients = updatedRecipe.ingredients ?? [];
        const i = tempIngredients.splice(index, 1);
        console.log(i, tempIngredients);
        setUpdatedRecipe(prevRecipe => ({...prevRecipe, ["ingredients"]: tempIngredients}))
    }
    
    const saveInput = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(e.target.value); //check type of "e"
    };
    

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        mutate(updatedRecipe);
    }

    useEffect(() => {
        if(isSuccess) {
            //toast("Recipe Successfully Updated")
            //still some error here. After 1st dismiss it closes if you click a button

           /* queryClient.invalidateQueries({
                queryKey: ["fetchRecipes"],
                refetchType: "all"
            });
            */
        }
        
        //setUpdatedRecipe({...updatedRecipe});
    }, [dismiss, isSuccess, updatedRecipe])


    return (
        <DialogContent className="sm:max-w-xl px-8 py-4">
            <DialogHeader>
                <DialogTitle className="font-bold text-gray-600 text-center">{name}</DialogTitle>
                <DialogDescription className="text-center">
                    Make changes to recipe
                </DialogDescription>
            </DialogHeader>
            <form className="border-b" onSubmit={handleSubmit}>
                <div className="py-2">
                    <Input 
                        type="text" 
                        name="name" 
                        placeholder="Recipe Name" 
                        value={updatedRecipe.name} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="flex flex-row justify-between py-2">
                    <div className="w-full mr-2">
                        <h3 className="font-medium">Category</h3>
                        <p className="text-sm mb-2">Select all that applies</p>
                        {Object.values(RecipeCategory).map((item, index) => (
                            <div 
                                key={index}
                                className="flex flex-row items-start space-x-3 space-y-1"
                            >
                                <Checkbox 
                                    id={item}
                                    value={item}
                                    className="border-sky-400"
                                    required={updatedRecipe.category?.length == 0}
                                    checked={updatedRecipe.category?.includes(item)}
                                    onCheckedChange={(checked) => {
                                        const category = updatedRecipe.category ?? [];
                                        return checked
                                        ? handleCheckedChange("category",[...category, item])
                                        : handleCheckedChange("category",
                                            category.filter(
                                                (val) => val != item 
                                            )
                                        )
                                    }}
                                />
                                <label
                                    htmlFor={item}
                                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="w-full ml-2">
                        <h3 className="font-medium">Diet Type</h3>
                        <p className="text-sm mb-2">Select all that applies</p>
                        {Object.values(RecipeMeal).map((item, index) => (
                            <div 
                                key={index}
                                className="flex flex-row items-start space-x-3 space-y-1"
                            >
                                <Checkbox 
                                    id={item}
                                    value={item}
                                    className="border-sky-400"
                                    required={updatedRecipe.meal?.length == 0}
                                    checked={updatedRecipe.meal?.includes(item)}
                                    onCheckedChange={(checked) => {
                                        const meal = updatedRecipe.meal ?? [];
                                        return checked
                                        ? handleCheckedChange("meal",[...meal, item])
                                        : handleCheckedChange("meal",
                                            meal.filter(
                                                (val) => val != item 
                                            )
                                        )
                                    }}
                                />
                                <label
                                    htmlFor={item}
                                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="py-2 flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <Input 
                            value={inputValue} 
                            type="text" 
                            placeholder="Add Ingredient"
                            onChange={saveInput}
                            onKeyDown={(e) => { 
                                if (e.key === 'Enter') return e.preventDefault()
                            }}
                            required={updatedRecipe.ingredients?.length == 0}
                        />
                        <PlusCircleIcon className="size-9 text-sky-400 cursor-pointer" onClick={addNewIngredient} />
                    </div>
                    { updatedRecipe.ingredients && updatedRecipe.ingredients.length > 0 && (
                        <div className="flex flex-wrap gap-1 py-1">
                            {updatedRecipe.ingredients.map((item, index) => (
                                <div className="relative" key={index}>
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className=" border-sky-200 text-sm text-gray-400"
                                    >
                                        {item}
                                    </Badge>
                                    <TrashIcon 
                                        className="size-3.5 text-red-600 cursor-pointer absolute -top-1 -right-1"
                                        onClick={() => deleteIngredient(index)}
                                    />
                                </div>
                                
                            ))}
                        </div>
                    )}
                </div>
                <div className="py-2 flex flex-row gap-2 items-center w-1/2">
                    <Input 
                        type="number"
                        name="preparationTime"
                        placeholder="Preparation Time"
                        value={updatedRecipe.preparationTime}
                        onChange={handleChange}
                        min={0}
                        required={updatedRecipe.preparationTime == 0}
                    />
                    <span className="font-bold text-sm">mins</span>
                </div>
                <div className="py-2 flex justify-center">
                    <Button type="submit" className="mb-3 bg-sky-400 cursor-pointer hover:bg-sky-800 hover:text-gray-300">Update recipe</Button>
                </div>
            </form>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button className='border-gray-300 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 cursor-pointer' type="button" variant="outline">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
      </DialogContent>
    );
}