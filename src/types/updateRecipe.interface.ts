import { IRecipe } from "./recipe.interface";

export type IUpdateRecipe = Partial<IRecipe> &  {_id: string}