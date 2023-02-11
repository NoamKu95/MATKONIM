import {
  configureStore,
  combineReducers,
  Action,
  ThunkAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import addRecipeSlice from "../features/addRecipe/state/addRecipeSlice";
import authSlice from "../features/auth/state/authSlice";
import errorHandlingSlice from "../features/errorHandling/state/errorHandlingSlice";
import homeSlice from "../features/home/state/homeSlice";
import recipeSlice from "../features/recipe/state/recipeSlice";
import searchSlice from "../features/search/state/searchSlice";
import profileSlice from "../features/profile/state/profileSlice";

export const store = configureStore({
  reducer: combineReducers({
    auth: authSlice,
    home: homeSlice,
    recipe: recipeSlice,
    search: searchSlice,
    addRecipe: addRecipeSlice,
    profile: profileSlice,
    errorHandling: errorHandlingSlice,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
