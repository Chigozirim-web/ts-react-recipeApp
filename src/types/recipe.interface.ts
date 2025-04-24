
export enum RecipeCategory {
    appetizer = "Appetizer",
    mainCourse = "Main Course",
    dessert = "Dessert",
    salad = "Salad",
    soup = "Soup",
    sideDish = "Side Dish",
    riceDish = "Rice Dish",
    snack = "Snack",
    breakfast = "Breakfast",
    lunch = "Lunch",
    dinner = "Dinner",
};


export enum RecipeMeal {
    vegeterian = "Vegetarian",
    vegan = "Vegan",
    pescatarian = "Pescatarian",
    omnivore = "Omnivore"
};

export interface IRecipe {
    name: string;
    ingredients: string[];
    category: RecipeCategory[];
    meal: RecipeMeal[];
    preparationTime: number;
    createdAt: Date;
};