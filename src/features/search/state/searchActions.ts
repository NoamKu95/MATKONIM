import {
  fetchRecipesOfUser,
  queryFirestore,
} from "../../../managers/firestoreManager";

// Types:
import { Recipe } from "../../../models/recipe";
import { collections } from "../../../models/types";

// Redux:
import store, { AppThunk } from "../../../store/store";
import { getCurrentUserID } from "../../auth/state/authActions";
import {
  setFilteredRecipes,
  setIsFetching,
  setSearchPhrase,
} from "./searchSlice";

export const getRecipesFromServer =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(setIsFetching(true));

      const myData: Recipe[] = []; //myRecipes.trendingRecipes;

      // TODO: check if there is a filter to apply

      // dispatch the received data
      dispatch(setFilteredRecipes(myData));
      dispatch(setIsFetching(false));
    } catch (error) {
      console.log(error); // TODO: Error Handling
      dispatch(setIsFetching(false));
    }
  };

export const updateSearchPhrase =
  (searchWords: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setSearchPhrase(searchWords));
    } catch (error) {
      console.log(error); // TODO: Error Handling
    }
  };

export const updateSearchResults =
  (): AppThunk => async (dispatch, getState) => {
    const searchText: string | null = getState().search.searchPhrase;
    const categoriesFilter: string[] = getState().search.searchCategories;
    const recipes = getState().home.recipes;

    const isSearchTextEmpty = searchText === null || searchText === "";
    const isCategoriesEmpty = categoriesFilter.length === 0;

    // No filters
    if (isSearchTextEmpty && isCategoriesEmpty) {
      dispatch(setFilteredRecipes(getState().home.recipes));
    }

    // Only chips filter
    else if (isSearchTextEmpty && !isCategoriesEmpty) {
      dispatch(setFilteredRecipes(getRecipesPoolBasedOnChosenCategories()));
    }

    // Only text filter
    else if (!isSearchTextEmpty && isCategoriesEmpty) {
      dispatch(
        setFilteredRecipes(filterRecipesFromArrByText(recipes, searchText))
      );
    }

    // 2 filters
    else if (!isSearchTextEmpty && !isCategoriesEmpty) {
      const recipesPoolByCategory = getRecipesPoolBasedOnChosenCategories();
      const filteredRecipes = filterRecipesFromArrByText(
        recipesPoolByCategory,
        searchText
      );
      dispatch(setFilteredRecipes(filteredRecipes));
    }
  };

const getRecipesPoolBasedOnChosenCategories = (): Recipe[] => {
  const categoriesFilter: string[] = store.getState().search.searchCategories;
  let newFilteredArr: Recipe[] = [];
  categoriesFilter.forEach((category) => {
    newFilteredArr = newFilteredArr.concat(
      store.getState().home.categorizedRecipes[category] ?? []
    );
  });
  return newFilteredArr;
};

const filterRecipesFromArrByText = (
  recipesArr: Recipe[],
  text: string
): Recipe[] => {
  return recipesArr.filter((recipe) => recipe.name.includes(text));
};
