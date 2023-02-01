// Models:
import { Recipe } from "../../../models/recipe";
import { collections } from "../../../models/types";

// Redux:
import { AppThunk } from "../../../store/store";
import { setIsFetching, setRecipes } from "./homeSlice";
import { getCurrentUserID } from "../../auth/state/authActions";
import { setFilteredRecipes } from "../../search/state/searchSlice";
import { fetchRecipesOfUser } from "../../../managers/firestoreManager";

export const getRecipesForHomepage =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(setIsFetching(true));
      let recipes = await fetchRecipesOfUser(
        `${collections.USERS}/${getCurrentUserID()}/${collections.RECIPES}`
      );

      dispatch(setRecipes(recipes ?? []));
      // dispatch(setFilteredRecipes(recipes));
    } catch (error) {
      console.log(error); // TODO: Error Handling
    } finally {
      dispatch(setIsFetching(false));
    }
  };
