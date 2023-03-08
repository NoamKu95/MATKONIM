// Models:
import { Recipe } from "../../../models/recipe";
import { collections } from "../../../models/types";

// Redux:
import store, { AppThunk } from "../../../store/store";
import { setCategorizedRecipes, setIsFetching, setRecipes } from "./homeSlice";
import { getCurrentUserID } from "../../auth/state/authActions";
import { setFilteredRecipes } from "../../search/state/searchSlice";
import { subscribeToRecipes } from "../../../managers/firestoreManager";

export const getRecipesForHomepage = (): (() => void) => {
  try {
    const unsubscribe = subscribeToRecipes(
      `${collections.USERS}/${getCurrentUserID()}/${collections.RECIPES}`,
      (recipes: Recipe[]) => {
        store.dispatch(setRecipes(recipes ?? []));
        store.dispatch(setFilteredRecipes(recipes ?? []));
        store.dispatch(
          setCategorizedRecipes(groupRecipesByCategory(recipes ?? []))
        );
      }
    );
    return unsubscribe;
  } catch (error) {
    console.log(error); // TODO: Error Handling
    return () => {};
  } finally {
    store.dispatch(setIsFetching(false));
  }
};

const groupRecipesByCategory = (
  recipes: Recipe[]
): { [key: string]: Recipe[] } => {
  const result: {
    [key: string]: Recipe[];
  } = {};
  recipes.forEach((recipe) => {
    if (!result[recipe.category]) {
      result[recipe.category] = [];
    }
    result[recipe.category].push(recipe);
  });
  return result;
};
