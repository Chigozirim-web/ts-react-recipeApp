import { FC, ReactElement, useState, useEffect } from "react";
import { IRecipe, RecipeCategory, RecipeMeal } from "@/types/recipe.interface";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon, TrashIcon }  from '@heroicons/react/24/solid';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateRecipe } from "@/hooks/createRecipe.hook";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const CreateRecipeForm: FC = (): ReactElement => {
    const [newRecipe, setNewRecipe] = useState<IRecipe>({
        name: "",
        ingredients: [],
        category: [],
        meal: [],
        preparationTime: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewRecipe(prevRecipe => ({...prevRecipe, [name]: value}))
    }
     
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCheckedChange = (name: string, value: any[]) => {
        setNewRecipe(prevRecipe => ({...prevRecipe, [name]: value}))
    }
    
    const addNewIngredient = () => {
        if(inputValue !== ""){    
            const tempIngredients = [...newRecipe.ingredients];
            tempIngredients.push(inputValue);
            setNewRecipe(prevRecipe => ({...prevRecipe, ["ingredients"]: tempIngredients}))
        }
        setInputValue("");
    };

    const deleteIngredient = (index: number) => {
        const tempIngredients = [...newRecipe.ingredients];
        tempIngredients.splice(index, 1);
        setNewRecipe(prevRecipe => ({...prevRecipe, ["ingredients"]: tempIngredients}))
    }
   

    const [inputValue, setInputValue] = useState<string>("");
    const saveInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setInputValue(e.target.value); //check type of "e"
    };

    const {mutate, isSuccess, isError, isPending} = useCreateRecipe();
    const queryClient = useQueryClient();

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(newRecipe);
    }

    useEffect(() => {
        if(isSuccess) {
            toast("New Recipe Created")
            
            queryClient.invalidateQueries({
                queryKey: ["fetchRecipes"],
                refetchType: "all"
            })
        }
        if(isError) {
            toast("Some error occured while adding new recipe")
        }
        setNewRecipe({
            name: "",
            ingredients: [],
            category: [],
            meal: [],
            preparationTime: 0
        });
    }, [isError, isSuccess]);

    return (
        <div>
            <h2 className="text-xl mb-4 text-center">Add a new recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className="py-2 mb-1">
                    <Input 
                        type="text" 
                        name="name" 
                        placeholder="Recipe Name" 
                        value={newRecipe.name} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="flex flex-row justify-between py-2 mb-1">
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
                                    required={newRecipe.category?.length == 0}
                                    checked={newRecipe.category?.includes(item)}
                                    onCheckedChange={(checked) => {
                                        return checked
                                        ? handleCheckedChange("category",[...newRecipe.category, item])
                                        : handleCheckedChange("category",
                                            newRecipe.category.filter(
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
                                    required={newRecipe.meal?.length == 0}
                                    checked={newRecipe.meal?.includes(item)}
                                    onCheckedChange={(checked) => {
                                        return checked
                                        ? handleCheckedChange("meal",[...newRecipe.meal, item])
                                        : handleCheckedChange("meal",
                                            newRecipe.meal.filter(
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
                <div className="py-2 flex flex-col gap-2 mb-1">
                    <div className="flex flex-row gap-2 items-center">
                        <Input 
                            value={inputValue} 
                            type="text" 
                            placeholder="Add Ingredient"
                            onChange={saveInput}
                            onKeyDown={(e) => { 
                                if (e.key === 'Enter') return e.preventDefault()
                            }}
                            required={newRecipe.ingredients?.length == 0}
                        />
                        <PlusCircleIcon className="size-9 text-sky-400 cursor-pointer" onClick={addNewIngredient} />
                    </div>
                    {newRecipe.ingredients.length > 0 && (
                        <div className="flex flex-wrap gap-1 py-1">
                            {newRecipe.ingredients.map((item, index) => (
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
                            {/*<p>{ingredients.map(item => item.at(0)?.toUpperCase() + item.substring(1)).join(", ")}</p> */}
                        </div>
                    )}
                </div>
                <div className="py-2 flex flex-row gap-2 items-center w-2/3 mb-1">
                    <Input 
                        type="number"
                        name="preparationTime"
                        placeholder="Preparation Time"
                        value={newRecipe.preparationTime}
                        onChange={handleChange}
                        min={0}
                        required={newRecipe.preparationTime == 0}
                    />
                    <span className="font-bold text-sm">mins</span>
                </div>
                <div className="py-2 flex justify-end">
                    <Button className="bg-sky-400 cursor-pointer hover:bg-sky-800 hover:text-gray-300">Create recipe</Button>
                </div>
            </form>
            <Toaster />
        </div>
    );
}

