import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Recipe} from '../../../models/recipe';

export interface HomeState {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  isFetching: boolean;
}

const initialState: HomeState = {
  recipes: [],
  filteredRecipes: [],
  isFetching: false,
};

export const HomeSlice = createSlice({
  name: 'HomeSlice',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
      state.filteredRecipes = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setFilteredRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.filteredRecipes = action.payload;
    },
  },
});

export const {setRecipes, setIsFetching, setFilteredRecipes} =
  HomeSlice.actions;

export default HomeSlice.reducer;
