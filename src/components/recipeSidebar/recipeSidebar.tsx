import { FC, ReactElement} from 'react';
import { Card } from '../ui/card';
import { CreateRecipeForm } from '../createRecipeForm/createRecipeForm';
import { Logout } from '../logout/logout';
import styles from "./style.module.css"
//import { IRecipe } from '@/types/recipe.interface';

export const RecipeSidebar: FC = (): ReactElement => {
    return(
        <section className={`top-23 right-8 h-2/3 mt-7 ${styles.sidebarHeight}`}>
            <Card className='flex flex-col w-full p-6 justify-between text-gray-500'>
                <CreateRecipeForm />
                <Logout />
            </Card>
        </section>
    );
}