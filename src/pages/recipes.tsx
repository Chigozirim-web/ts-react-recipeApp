import { FC, ReactElement} from 'react';
import { NavBar } from '@/components/nav/navBar';
import { Recipe } from '@/components/recipe/recipe';
import { IRecipe } from '@/types/recipe.interface';
import { RecipeSidebar } from '@/components/recipeSidebar/recipeSidebar';
import { useFetchRecipes } from '@/hooks/fetchRecipes.hook';

//Use at top of page ??
function todaysDate() {
    const today = new Date();

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    const todaysFormattedDate = today.toLocaleString("en-GB", options);
    return todaysFormattedDate;
}

export const Recipes: FC = (): ReactElement => {
    
    const { data, isSuccess, isError} = useFetchRecipes({});

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
                                {
                                    data && 
                                    Array.isArray(data.data) &&
                                    data.data.every((item): item is IRecipe =>
                                        "_id" in item &&
                                        "name" in item &&
                                        "ingredients" in item &&
                                        "category" in item &&
                                        "meal" in item &&
                                        "preparationTime" in item
                                    ) &&
                                    data.data.map((recipe) => (
                                        <Recipe key={recipe._id} {...recipe} />
                                    ))
                                }
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