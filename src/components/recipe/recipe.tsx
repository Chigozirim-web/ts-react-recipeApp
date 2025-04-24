import { FC, ReactElement } from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IRecipe } from '@/types/recipe.interface';
  

export const Recipe: FC<IRecipe> = (props): ReactElement => {
    const recipe = props;

    const formatedDate = new Date(recipe.createdAt).toLocaleDateString('en-GB', {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <Card className='text-gray-500 w-full'>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="basis-2/3 leading-8">{recipe.name}</CardTitle>
                <div>
                    <Badge className='text-gray-500' variant="outline">{formatedDate}</Badge>
                </div>
            </CardHeader>
            <CardContent className='flex flex-row gap-2'>
                {recipe.category.map((x, index) => (
                    <Badge 
                    key={x + index} 
                    className="bg-sky-700 p-2"
                    >
                        {x}
                    </Badge>
                ))}

                {recipe.meal.map((x, index) => (
                    <Badge 
                        key={x + index} 
                        className={`${
                            x === 'Vegan' || x === 'Vegetarian' ? 'bg-green-500' :
                            x === 'Pescatarian' ? 'bg-sky-300' : 
                            x === 'Omnivore' ? 'bg-orange-500' : 'bg-gray-500'
                        }`}
                    >
                        {x}
                    </Badge>
                ))}

            </CardContent>
            <CardFooter>
                <Button 
                    variant="outline" 
                    className="bg-gray-200 hover:bg-gray-300 hover:text-gray-800 cursor-pointer"
                    onClick={() => {}}
                >
                    View Recipe
                </Button>
            </CardFooter>
        </Card>
    );
}

/**
 * <Badge 
        key={x + index} 
        className={`p-2 ${
            x === 'Appetizer' ? 'bg-yellow-500' : 
            x === 'Main Course' ? 'bg-sky-700' : 
            x === 'Dessert' ? 'bg-pink-500' : 
            x === 'Salad' ? 'bg-green-300' : 
            x === 'Soup' ? 'bg-red-400' : 
            x === 'Side Dish' ? 'bg-gray-500' : 
            x === 'Rice Dish' ? 'bg-gray-400' : 
            x === 'Snack' ? 'bg-purple-500' : 
            x === 'Breakfast' ? 'bg-blue-500' : 
            x === 'Lunch' ? 'bg-teal-500' : 
            x === 'Dinner' ? 'bg-indigo-500' : ''
        }`}
    >
        {x}
    </Badge>
 */