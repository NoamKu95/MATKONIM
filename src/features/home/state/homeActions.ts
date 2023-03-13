// Models:
import { Recipe } from "../../../models/recipe";
import { collections } from "../../../models/types";

// Redux:
import store, { AppThunk } from "../../../store/store";
import { setCategorizedRecipes, setIsFetching, setRecipes } from "./homeSlice";
import { getCurrentUserID } from "../../auth/state/authActions";
import { setFilteredRecipes } from "../../search/state/searchSlice";
import { subscribeToRecipes } from "../../../managers/firestoreManager";

export const getRecipesForHomepage =
  (): AppThunk<() => void> => async (dispatch, getState) => {
    try {
      const unsubscribe = subscribeToRecipes(
        // collection path
        `${collections.USERS}/${getCurrentUserID()}/${collections.RECIPES}`,
        // callback to handle fetched recipes
        (recipes: Recipe[]) => {
          store.dispatch(saveFetchedRecipes(recipes));
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

const saveFetchedRecipes =
  (recipes: Recipe[]): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setRecipes(recipes ?? []));
    dispatch(setFilteredRecipes(recipes ?? []));
    dispatch(setCategorizedRecipes(groupRecipesByCategory(recipes ?? [])));
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
