import { FC, ReactElement } from 'react';
import { IRecipe } from '@/types/recipe.interface';

//This will be a popup modal that will show the recipe details when a recipe is clicked on the recipes page
export const RecipeView: FC<IRecipe> = (props): ReactElement => {
    // Destructure the props to get the recipe details
    const { name, ingredients, category, meal, preparationTime } = props;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            {/* I WOULD HAVE TO USE A SHADCNUI "DIALOG" COMPONENT HERE INSTEAD */}
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
    );
};