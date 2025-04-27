import { FC, ReactElement, SetStateAction, useState } from "react";
import { RecipeCategory, RecipeMeal } from "@/types/recipe.interface";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PlusCircleIcon, TrashIcon }  from '@heroicons/react/24/solid';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export const CreateRecipeForm: FC = (): ReactElement => {
    const [ ingredients, setIngredients ] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const saveInput = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(e.target.value); //check type of "e"
    };

    const addNewIngredient = () => {
        if(inputValue !== ""){    
            const tempIngredients = [...ingredients];
            tempIngredients.push(inputValue);
            setIngredients(tempIngredients);
        }
        setInputValue("");
    };

    const deleteIngredient = (index: number) => {
        const tempIngredients = [...ingredients];
        const i = tempIngredients.splice(index, 1);
        console.log(i);
        console.log(tempIngredients);
        setIngredients(tempIngredients);
    }

    return (
        <div>
            <h2 className="text-xl mb-4 text-center">Add a new recipe</h2>
            <form>
                <div className="py-2 mb-1">
                    <Input type="text" placeholder="Recipe Name" />
                </div>
                <div className="flex flex-row justify-between py-2 mb-1">
                    <div className="w-full mr-2">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(RecipeCategory).map((item, idx) => (
                                    <SelectItem 
                                        key={item + idx}
                                        value={`${item}`}
                                    >
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full ml-2">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Meal Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(RecipeMeal).map((item, idx) => (
                                    <SelectItem 
                                        key={item + idx}
                                        value={`${item}`}
                                    >
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="py-2 flex flex-col gap-2 mb-1">
                    <div className="flex flex-row gap-2 items-center">
                        <Input 
                            value={inputValue} 
                            type="text" 
                            placeholder="Add Ingredient"
                            onChange={saveInput}
                        />
                        <PlusCircleIcon className="size-9 text-sky-600 cursor-pointer" onClick={addNewIngredient} />
                    </div>
                    {ingredients.length > 0 && (
                        <div className="flex gap-1 py-1">
                            {/**ADD FUNCTIONALITY TO DELETE AN INGREDIENT TOO */}
                            {ingredients.map((item, index) => (
                                <div className="relative">
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
                    <Input type="number" placeholder="Preparation Time" />
                    <span className="font-bold text-sm">mins</span>
                </div>
                <div className="py-2 flex justify-end">
                    <Button className="bg-sky-600 cursor-pointer hover:bg-sky-800 hover:text-gray-300">Create recipe</Button>
                </div>
            </form>
        </div>
    );
}