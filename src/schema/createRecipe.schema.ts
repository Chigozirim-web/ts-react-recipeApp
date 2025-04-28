import { z } from "zod";

export const CreateRecipeSchema = z.object({
    name: z.string(),
    ingredients: z.array(z.string(), {
        message: "Enter at least one ingredient"
    }),
    category: z.array(z.string(), {
            message: "Category is required"
    }),
    meal: z.array(z.string(), {
        message: "Diet Type is required"
    }),
    preparationTime: z.coerce.number(),
});

//createdAt: Date;
/**
 * z.enum([
        "Appetizer", "Main Course", "Dessert", "Salad", "Soup", "Side Dish", 
        "Rice Dish", "Snack", "Breakfast", "Lunch", "Dinner"])

    z.enum([ "Vegetarian",  "Vegan", "Pescatarian", "Omnivore"]
 */