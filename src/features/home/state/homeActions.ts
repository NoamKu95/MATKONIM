// Models:
import { Recipe } from "../../../models/recipe";
import { collections } from "../../../models/types";

// Redux:
import { AppThunk } from "../../../store/store";
import {
  setCategorizedRecipes,
  setIsFetching,
  setRecipes,
  setUnsubscribeSnapshotFunction,
} from "./homeSlice";
import { getCurrentUserID } from "../../auth/state/authActions";
import { setFilteredRecipes } from "../../search/state/searchSlice";
import { subscribeToRecipes } from "../../../managers/firestoreManager";

export const getRecipesForHomepage =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const unsubscribe = subscribeToRecipes(
        `${collections.USERS}/${getCurrentUserID()}/${collections.RECIPES}`,
        (recipes: Recipe[]) => {
          dispatch(setRecipes(recipes ?? []));
          dispatch(setFilteredRecipes(recipes ?? []));
          dispatch(
            setCategorizedRecipes(groupRecipesByCategory(recipes ?? []))
          );
        }
      );

      dispatch(setUnsubscribeSnapshotFunction(unsubscribe));
    } catch (error) {
      console.log(error); // TODO: Error Handling
    } finally {
      dispatch(setIsFetching(false));
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
