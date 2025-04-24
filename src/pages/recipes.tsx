import { FC, ReactElement} from 'react';
import { NavBar } from '@/components/nav/navBar';
import { Recipe } from '@/components/recipe/recipe';
import { IRecipe, RecipeCategory, RecipeMeal } from '@/types/recipe.interface';
import { RecipeSidebar } from '@/components/recipeSidebar/recipeSidebar';

export const Recipes: FC = (): ReactElement => {
    const recipes: IRecipe[] = [
        {
            name: "Spaghetti Bolognese",
            ingredients: ["Spaghetti", "Ground beef", "Tomato sauce", "Onion", "Garlic"],
            category: [RecipeCategory.mainCourse, RecipeCategory.dinner],
            meal: [RecipeMeal.omnivore],
            preparationTime: 30,
            createdAt: new Date(),
        },
        {
            name: "Caesar Salad",
            ingredients: ["Lettuce", "Croutons", "Parmesan cheese", "Caesar dressing"],
            category: [RecipeCategory.salad, RecipeCategory.appetizer],
            meal: [RecipeMeal.vegeterian],
            preparationTime: 15,
            createdAt: new Date(),
        },
        {
            name: "Chocolate Cake",
            ingredients: ["Flour", "Cocoa powder", "Sugar", "Eggs", "Butter"],
            category: [RecipeCategory.dessert],
            meal: [RecipeMeal.omnivore],
            preparationTime: 60,
            createdAt: new Date(),
        },
        {
            name: "Vegetable Stir Fry",
            ingredients: ["Broccoli", "Carrots", "Bell peppers", "Soy sauce"],
            category: [RecipeCategory.mainCourse, RecipeCategory.sideDish],
            meal: [RecipeMeal.vegeterian, RecipeMeal.vegan],
            preparationTime: 20,
            createdAt: new Date(),
        },
        {
            name: "Chicken Soup",
            ingredients: ["Chicken", "Carrots", "Celery", "Noodles"],
            category: [RecipeCategory.soup],
            meal: [RecipeMeal.omnivore],
            preparationTime: 45,
            createdAt: new Date(),
        },
    ];
    return (
        <section className='flex flex-col gap-4 w-full h-full text-gray-600'>
            <NavBar firstName='Margaret' />
            <div className='relative top-18'>
            <section className='flex flex-row gap-8 w-full p-4'>
                <section className='flex basis-2/3 justify-center'>
                    <div className='flex flex-col p-4 w-4/5'>
                        <div className='flex flex-row items-center justify-between p-2 mb-4'>
                            <h1 className='text-gray-400 font-bold text-xl'>
                                Recipes
                            </h1>
                            <div className='flex'>
                                {/* This is going to be a dropdown select menu */}
                                <input type="text" placeholder="Sort by..." className="border border-gray-300 rounded px-2 py-2" />	
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-4'>
                            {recipes.map((recipe, index) => (
                                <Recipe key={index} {...recipe} />
                            ))}
                        </div>
                    </div>
                </section>
                <section className='flex basis-1/3'>
                    <RecipeSidebar />
                </section>
            </section>
            </div>
        </section>
    );
}