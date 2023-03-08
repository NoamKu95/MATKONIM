import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "../../../../firebase";
import { Recipe } from "../../../models/recipe";

export interface HomeState {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  categorizedRecipes: {
    [key: string]: Recipe[];
  };
  isFetching: boolean;
  unsubscribeSnapshotFunction: Function | null;
}

const initialState: HomeState = {
  recipes: [],
  filteredRecipes: [],
  categorizedRecipes: {},
  isFetching: false,
  unsubscribeSnapshotFunction: null,
};

export const HomeSlice = createSlice({
  name: "HomeSlice",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
      state.filteredRecipes = action.payload;
    },
    setCategorizedRecipes: (
      state,
      action: PayloadAction<{
        [key: string]: Recipe[];
      }>
    ) => {
      state.categorizedRecipes = action.payload;
    },
    setFilteredRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.filteredRecipes = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setUnsubscribeSnapshotFunction: (
      state,
      action: PayloadAction<Function | null>
    ) => {
      state.unsubscribeSnapshotFunction = action.payload;
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      console.log("lets add recipe: " + action.payload.name);

      state.recipes.push(action.payload);
    },
  },
});

export const {
  setRecipes,
  addRecipe,
  setCategorizedRecipes,
  setIsFetching,
  setFilteredRecipes,
  setUnsubscribeSnapshotFunction,
} = HomeSlice.actions;

export default HomeSlice.reducer;
