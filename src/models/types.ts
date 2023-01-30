export const textInputTypes = {
  EMAIL: "email",
  PASSWORD: "password",
  NAME: "name",
};

export const AddRecipeTextInputTypes = {
  RECIPE_NAME: "recipeName",
  RECIPE_DURATION: "recipeDuration",
  RECIPE_SERVINGS: "recipeServings",
  INGREDIENT_NAME: "ingredientName",
  INGREDIENT_AMOUNT: "ingredientAmount",
  PREPARATION_STEP: "recipePreparationStep",
  ADD_PREPARATION_STEP: "addRecipePreparationStep",
};

export const collections = {
  USERS: "users",
  RECIPES: "recipes",
  INGREDIENTS: "ingredients",
  PREPARATION_STEPS: "preparationSteps",
};

export const measurements: { name: string; englishName: string }[] = [
  {
    name: "גרם",
    englishName: "gr",
  },
  {
    name: "ק״ג",
    englishName: "kg",
  },
  {
    name: "כוס",
    englishName: "cup",
  },
  {
    name: "כף",
    englishName: "spoon",
  },
  {
    name: "כפית",
    englishName: "tablespoon",
  },
  {
    name: "יח׳",
    englishName: "unit",
  },
  {
    name: "ליטר",
    englishName: "liter",
  },
  {
    name: "מ״ל",
    englishName: "ml",
  },
];
