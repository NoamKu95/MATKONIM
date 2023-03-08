// Outer imports:
import { launchImageLibrary } from "react-native-image-picker";

// Inner imports:
import { validateNumber, validateText } from "../../../utils/validators";
import {
  addFileToCollection,
  downloadImageFromStorage,
  uploadImageToStorage,
} from "../../../managers/firestoreManager";

// Types:
import { Recipe } from "../../../models/recipe";
import { Ingredient } from "../../../models/ingredient";
import { AddRecipeTextInputTypes, collections } from "../../../models/types";

// Redux:
import { AppThunk } from "../../../store/store";
import { getCurrentUserID } from "../../auth/state/authActions";
import {
  addIngredient,
  addRecipePreparationStep,
  resetAddRecipeState,
  setIngredientAmount,
  setIngredientMeasurement,
  setIngredientName,
  setIsLoading,
  setRecipeDuration,
  setRecipeImageUri,
  setRecipeImageWarning,
  setRecipeName,
  setRecipePreparationStepsWarning,
  setRecipePrepStep,
  setRecipeServings,
} from "./addRecipeSlice";

export const clearForm = (): AppThunk => async (dispatch) => {
  dispatch(resetAddRecipeState());
};

// MARK: State Updates
export const updateStateValueWithString =
  (newText: string, textInputType: string): AppThunk =>
  async (dispatch) => {
    switch (textInputType) {
      case AddRecipeTextInputTypes.RECIPE_NAME:
        dispatch(setRecipeName(newText));
        break;
      case AddRecipeTextInputTypes.RECIPE_DURATION:
        dispatch(setRecipeDuration(newText));
        break;
      case AddRecipeTextInputTypes.INGREDIENT_NAME:
        dispatch(setIngredientName(newText));
        break;
      case AddRecipeTextInputTypes.PREPARATION_STEP:
        dispatch(setRecipePrepStep(newText));
        break;
      default:
        break;
    }
  };

export const updateStateValueWithNumber =
  (newVal: number, textInputType: string): AppThunk =>
  async (dispatch) => {
    switch (textInputType) {
      case AddRecipeTextInputTypes.RECIPE_SERVINGS:
        dispatch(setRecipeServings(newVal));
        break;
      case AddRecipeTextInputTypes.INGREDIENT_AMOUNT:
        dispatch(setIngredientAmount(newVal));
        break;
    }
  };

export const addIngredientToNewRecipe =
  (
    name: string | null,
    amount: number | null,
    measure: string | null
  ): AppThunk =>
  (dispatch) => {
    if (
      validateText(name) === null &&
      validateText(measure) === null &&
      validateNumber(amount) === null
    ) {
      let newIngredient: Ingredient = {
        name: name ?? "",
        amount: amount ?? 0,
        measure: measure ?? "",
      };
      dispatch(addIngredient(newIngredient));
      dispatch(setIngredientName(null));
      dispatch(setIngredientAmount(null));
      dispatch(setIngredientMeasurement(null));
    } else {
      // TODO: Error Handling
    }
  };

export const addPrepStepToNewRecipe =
  (newStep: string): AppThunk =>
  (dispatch) => {
    if (validateText(newStep) === null) {
      dispatch(addRecipePreparationStep(newStep));
      dispatch(setRecipePrepStep(null));
      dispatch(setRecipePreparationStepsWarning(null));
    } else {
      // TODO: Error Handling
      console.log("cant add new step as it fails validateText");
    }
  };

export const saveRecipe = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const stateRecipe = getState().addRecipe;

  let recipe: Recipe = {
    name: stateRecipe.recipeName ?? "",
    image: "",
    duration: stateRecipe.recipeDuration ?? "",
    serving: stateRecipe.recipeServings ?? 0,
    category: stateRecipe.recipeCategory ?? "",
    ingredients: stateRecipe.recipeIngredients,
    preparationSteps: stateRecipe.recipePreparationSteps,
  };

  dispatch(
    uploadImageToStorage(() => {
      dispatch(addRecipeToUserCollection(recipe));
    })
  );
};

export const addRecipeToUserCollection =
  (recipe: Recipe): AppThunk =>
  async (dispatch, getState) => {
    console.log(recipe);

    recipe.image = getState().addRecipe.recipeImageURL ?? "";
    try {
      await addFileToCollection(
        `${collections.USERS}/${getCurrentUserID()}/${collections.RECIPES}`,
        recipe
      );
      dispatch(resetAddRecipeState());
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error); // TODO: Error Handling
      dispatch(setIsLoading(false));
    }
  };

export const openDeviceGallery = (): AppThunk => async (dispatch) => {
  launchImageLibrary({ mediaType: "photo" }, (response) => {
    if (response.didCancel) {
      dispatch(setRecipeImageWarning("חובה לבחור תמונה למתכון"));
    } else if (response.errorMessage !== undefined) {
      dispatch(setRecipeImageWarning("אופס, משהו השתבש בפתיחת הגלריה"));
      console.log("picker error: ", response.errorMessage);
    } else if (response.assets) {
      const source = response.assets[0].uri ?? "";
      dispatch(setRecipeImageUri(source));
      dispatch(setRecipeImageWarning(null));
    }
  });
};
