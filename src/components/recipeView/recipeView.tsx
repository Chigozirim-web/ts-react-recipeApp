import { FC, ReactElement } from 'react';
import { IRecipe } from '@/types/recipe.interface';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Skeleton } from "@/components/ui/skeleton"


//This will be a popup modal that will show the recipe details when a recipe is clicked on the recipes page
export const RecipeView: FC<IRecipe> = (props): ReactElement => {
    // Destructure the props to get the recipe details
    const { name, ingredients, category, meal, preparationTime } = props;

    return (
        <DialogContent className="sm:max-w-xl">
            <DialogHeader className='p-2 border-b border-gray-200'>
                <DialogTitle className="font-bold text-gray-600">
                    {name}
                </DialogTitle>
                <DialogDescription>
                    <span className='flex flex-row items-center gap-1 mt-2'>
                        {category.map((x, index) => (
                            <Badge 
                                key={index}
                                variant="outline"
                                className="border-sky-700 text-gray-500"
                            >
                                {x}
                            </Badge>
                        ))}
                        {meal.map((x, index) => (
                            <Badge 
                                key={index}
                                variant="outline"
                                className={`text-gray-500 ${
                                    x === 'Vegan' ? 'border-green-500' :
                                    x === 'Vegetarian' ? 'border-green-400' :
                                    x === 'Pescatarian' ? 'border-sky-300' : 
                                    x === 'Omnivore' ? 'border-orange-500' : ''
                                }`}
                            >
                                {x}
                            </Badge>
                        ))}
                    </span>
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col justify-center text-gray-600">
                <div className='pl-2'>
                    <h4 className='font-bold text-gray-500'>Preparation time:&nbsp;
                        <span className='font-normal'>{preparationTime} mins</span>
                    </h4>
                </div>
                <div className=' p-2'>
                    <h3 className='font-bold text-gray-500 mb-3'>Ingredients: </h3>
                    <div className='grid grid-cols-3 items-start gap-1'>
                    {ingredients.map((ingredient, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[20px_1fr] items-start pb-3 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-400" />
                            <div className="space-y">
                                <p className="text-sm font-medium leading-none">
                                    {ingredient}
                                </p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className='p-2'>
                    <h3 className='font-bold text-gray-500 mb-3'>Instructions: </h3>
                    <div className="flex flex-col space-y-2 items-center">
                        <Skeleton className="h-[100px] w-[350px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[350px]" />
                            <Skeleton className="h-4 w-[300px]" />
                        </div>
                    </div>
                </div>
            </div>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button className='bg-sky-400 text-gray-600 cursor-pointer hover:bg-sky-500 hover:text-gray-700' type="button" variant="outline">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

/**
 * <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            {/* I WOULD HAVE TO USE A SHADCNUI "DIALOG" COMPONENT HERE INSTEAD *
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">{name}</h2>
                <div className="space-y-4">
                    <div>
                        <span className="font-semibold">Category:</span> {category.join(', ')}
                    </div>
                    <div>
                        <span className="font-semibold">Meal Type:</span> {meal.join(', ')}
                    </div>
                    <div>
                        <span className="font-semibold">Preparation Time:</span> {preparationTime} minutes
                    </div>
                    <div>
                        <span className="font-semibold">Ingredients:</span>
                        <ul className="list-disc ml-5 mt-2">
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
 */