import { FC, ReactElement} from 'react';
import { NavBar } from '@/components/nav/navBar';

export const Recipes: FC = (): ReactElement => {
    return (
        <section className='flex flex-col gap-4 w-full h-full'>
            <NavBar />
            <section className='flex flex-row gap-8 w-full p-4'>
                <section className='flex basis-2/3 justify-center bg-pink-500'>
                    <div className='flex flex-col p-4 w-4/5'>
                        <h1 className='text-black font-bold text-2xl mb-8'>
                            Recipes: 
                        </h1>
                        <div className='flex flex-col gap-4'>
                            <div>Recipe 1</div>
                            <div>Recipe 2</div>
                        </div>
                    </div>
                </section>
                <section className='flex basis-1/3 bg-pink-300'>Add new recipe</section>
            </section>
            
        </section>
    );
}