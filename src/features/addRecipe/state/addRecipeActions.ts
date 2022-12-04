import {
  addFileToCollection,
  downloadImageFromStorage,
  uploadImageToStorage,
} from '../../../managers/firestoreManager';
import {Ingredient} from '../../../models/ingredient';
import {Recipe} from '../../../models/recipe';
import {AddRecipeTextInputTypes, collections} from '../../../models/types';
import {AppThunk} from '../../../store/store';
import {validateNumber, validateText} from '../../../utils/validators';
import {getCurrentUserID} from '../../auth/state/authActions';
import {launchImageLibrary} from 'react-native-image-picker';
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
  setRecipePrepStep,
  setRecipeServings,
} from './addRecipeSlice';

export const clearForm = (): AppThunk => async dispatch => {
  dispatch(resetAddRecipeState());
};

// MARK: Validations
export const validateInputText =
  (input: string | null, textInputType: string): AppThunk =>
  async () => {
    if (input) {
      if (input.length < 5) {
        // TODO: display "text too short" alert
      } else {
        let reg = /^[^!-\/:-@\[-`{-~]+$/;
        if (!reg.test(input.trim())) {
          // TODO: display "text contains illegal characters" alert
        } else {
          console.log('hi 2');

          updateStateValueWithString(input, textInputType);
        }
      }
    } else {
      // TODO: display "text was left empty" alert
    }
  };

export const validateInputNumber =
  (input: number | null, textInputType: string): AppThunk =>
  async () => {
    if (input) {
      if (input === 0) {
        // TODO: display "value must not be zero" alert
      } else {
        updateStateValueWithNumber(input, textInputType);
      }
    } else {
      // TODO: display "text was left empty" alert
    }
  };

// MARK: State Updates
export const updateStateValueWithString =
  (newText: string, textInputType: string): AppThunk =>
  async dispatch => {
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
      case AddRecipeTextInputTypes.ADD_PREPARATION_STEP:
        dispatch(addRecipePreparationStep(newText));
        break;
      default:
        break;
    }
  };

export const updateStateValueWithNumber =
  (newVal: number, textInputType: string): AppThunk =>
  async dispatch => {
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
    measure: string | null,
  ): AppThunk =>
  async dispatch => {
    if (
      validateText(name) === null &&
      validateText(measure) === null &&
      validateNumber(amount) === null
    ) {
      let newIngredient: Ingredient = {
        name: name ?? '',
        amount: amount ?? 0,
        measure: measure ?? '',
      };
      dispatch(addIngredient(newIngredient));
      dispatch(setIngredientName(null));
      dispatch(setIngredientAmount(null));
      dispatch(setIngredientMeasurement(null));
    } else {
      // TODO: Error Handling
    }
  };

export const saveRecipe = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const stateRecipe = getState().addRecipe;

  let recipe: Recipe = {
    name: stateRecipe.recipeName ?? '',
    image: '',
    duration: stateRecipe.recipeDuration ?? '',
    serving: stateRecipe.recipeServings ?? 0,
    category: stateRecipe.recipeCategory ?? '',
    ingredients: stateRecipe.recipeIngredients,
    preparationSteps: stateRecipe.recipePreparationSteps,
  };

  dispatch(
    uploadImageToStorage(() => {
      dispatch(addRecipeToUserCollection(recipe));
    }),
  );
};

export const addRecipeToUserCollection =
  (recipe: Recipe): AppThunk =>
  async (dispatch, getState) => {
    recipe.image = getState().addRecipe.recipeImageURL ?? '';
    try {
      addFileToCollection(
        `${collections.USERS}/${getCurrentUserID()}/${collections.RECIPES}`,
        recipe,
        () => {
          dispatch(resetAddRecipeState());
          dispatch(setIsLoading(false));
          downloadImageFromStorage(recipe.image);
        },
      );
    } catch (error) {
      console.log(error); // TODO: Error Handling
      dispatch(setIsLoading(false));
    }
  };

export const openDeviceGallery = (): AppThunk => async dispatch => {
  launchImageLibrary({mediaType: 'photo'}, response => {
    if (response.didCancel) {
      dispatch(setRecipeImageWarning('חובה לבחור תמונה למתכון'));
    } else if (response.errorMessage !== undefined) {
      dispatch(setRecipeImageWarning('אופס, משהו השתבש בפתיחת הגלריה'));
      console.log('picker error: ', response.errorMessage);
    } else if (response.assets) {
      const source = response.assets[0].uri ?? '';
      dispatch(setRecipeImageUri(source));
      dispatch(setRecipeImageWarning(null));
    }
  });
};
