import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Recipe} from '../../../models/recipe';

export interface RestaurantState {
  selectedRecipe: Recipe | null;
}

const initialState: RestaurantState = {
  selectedRecipe: null,
};

export const RecipeSlice = createSlice({
  name: 'RecipeSlice',
  initialState,
  reducers: {
    setSelectedRecipe: (state, action: PayloadAction<Recipe>) => {
      state.selectedRecipe = action.payload;
    },
  },
});

export const {setSelectedRecipe} = RecipeSlice.actions;

export default RecipeSlice.reducer;
