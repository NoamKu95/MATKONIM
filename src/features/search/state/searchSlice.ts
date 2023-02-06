import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../../../models/recipe";

export interface SearchState {
  isFetching: boolean;
  searchPhrase: string | null;
  searchCategories: string[];
  filteredRecipes: Recipe[];
}

const initialState: SearchState = {
  isFetching: false,
  searchPhrase: null,
  searchCategories: [],
  filteredRecipes: [],
};

export const SearchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  reducers: {
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setSearchPhrase: (state, action: PayloadAction<string>) => {
      state.searchPhrase = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string[]>) => {
      state.searchCategories = action.payload;
    },
    setFilteredRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.filteredRecipes = action.payload;
    },
    updateFilteredResults: (state, action: PayloadAction<Recipe[]>) => {
      state.filteredRecipes = action.payload;
      state.isFetching = false;
    },
  },
});

export const {
  setIsFetching,
  setSearchPhrase,
  setCategoryFilter,
  setFilteredRecipes,
  updateFilteredResults,
} = SearchSlice.actions;

export default SearchSlice.reducer;
