import { FC, ReactElement} from 'react';
import { Card } from '../ui/card';
import { CreateRecipeForm } from '../createRecipeForm/createRecipeForm';
import { Logout } from '../logout/logout';
import styles from "./style.module.css"
//import { IRecipe } from '@/types/recipe.interface';

export const RecipeSidebar: FC = (): ReactElement => {
    return(
        <section className={`fixed top-43 right-8 ${styles.sidebarHeight}`}>
            <Card className='flex flex-col w-full h-full p-6 justify-between text-gray-500'>
                <CreateRecipeForm />
                <Logout />
            </Card>
        </section>
    );
}