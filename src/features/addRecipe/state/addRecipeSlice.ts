import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ingredient} from '../../../models/ingredient';

export interface HomeState {
  isLoading: boolean;
  loadingText: string;

  recipeName: string | null;
  recipeNameWarning: string | null;

  recipeDuration: string | null;
  recipeDurationWarning: string | null;

  recipeServings: number | null;
  recipeServingsWarning: string | null;

  recipeCategory: string | null;
  recipeCategoryWarning: string | null;

  recipeIngredients: Ingredient[];
  recipeIngredientsWarning: string | null;

  ingredientName: string | null;
  ingredientNameWarning: string | null;
  ingredientAmount: number | null;
  ingredientAmountWarning: string | null;
  ingredientMeasurement: string | null;
  ingredientMeasurementWarning: string | null;

  recipePrepStep: string | null;
  recipePrepStepWarning: string | null;
  recipePreparationSteps: string[];
  recipePreparationStepsWarning: string | null;

  recipeImageWarning: string | null;

  recipeImageUri: string | null; // uri of chosen pic from gallery
  isUploadingImage: boolean;
  imageTransferred: number | null; // % of uploading pic to storage
  recipeImageURL: string | null; // url of pic in storage
}

const initialState: HomeState = {
  isLoading: false,
  loadingText: '',
  recipeName: null,
  recipeNameWarning: null,

  recipeDuration: null,
  recipeDurationWarning: null,

  recipeServings: null,
  recipeServingsWarning: null,

  recipeCategory: null,
  recipeCategoryWarning: null,

  recipeIngredients: [],
  recipeIngredientsWarning: null,

  ingredientName: null,
  ingredientNameWarning: null,
  ingredientAmount: null,
  ingredientAmountWarning: null,
  ingredientMeasurement: null,
  ingredientMeasurementWarning: null,

  recipePrepStep: null,
  recipePrepStepWarning: null,
  recipePreparationSteps: [],
  recipePreparationStepsWarning: null,

  recipeImageWarning: null,
  recipeImageUri: null,
  isUploadingImage: false,
  imageTransferred: null,
  recipeImageURL: null,
};

export const AddRecipeSlice = createSlice({
  name: 'AddRecipeSlice',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoadingText: (state, action: PayloadAction<string>) => {
      state.loadingText = action.payload;
    },
    setRecipeName: (state, action: PayloadAction<string | null>) => {
      state.recipeName = action.payload;
    },
    setRecipeNameWarning: (state, action: PayloadAction<string | null>) => {
      state.recipeNameWarning = action.payload;
    },
    setRecipeDuration: (state, action: PayloadAction<string | null>) => {
      state.recipeDuration = action.payload;
    },
    setRecipeDurationWarning: (state, action: PayloadAction<string | null>) => {
      state.recipeDurationWarning = action.payload;
    },
    setRecipeServings: (state, action: PayloadAction<number | null>) => {
      state.recipeServings = action.payload;
    },
    setRecipeServingsWarning: (state, action: PayloadAction<string | null>) => {
      state.recipeServingsWarning = action.payload;
    },
    setRecipeCategory: (state, action: PayloadAction<string | null>) => {
      state.recipeCategory = action.payload;
    },
    setRecipeCategoryWarning: (state, action: PayloadAction<string | null>) => {
      state.recipeCategoryWarning = action.payload;
    },
    setIngredientName: (state, action: PayloadAction<string | null>) => {
      state.ingredientName = action.payload;
    },
    setIngredientNameWarning: (state, action: PayloadAction<string | null>) => {
      state.ingredientNameWarning = action.payload;
    },
    setIngredientAmount: (state, action: PayloadAction<number | null>) => {
      state.ingredientAmount = action.payload;
    },
    setIngredientAmountWarning: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.ingredientAmountWarning = action.payload;
    },
    setIngredientMeasurement: (state, action: PayloadAction<string | null>) => {
      state.ingredientMeasurement = action.payload;
    },
    setIngredientMeasurementWarning: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.ingredientMeasurementWarning = action.payload;
    },
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.recipeIngredients.push(action.payload);
    },
    setRecipeIngredientsWarning: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.recipeIngredientsWarning = action.payload;
    },
    setRecipePrepStep: (state, action: PayloadAction<string | null>) => {
      state.recipePrepStep = action.payload;
    },
    setRecipePrepStepWarning: (state, action: PayloadAction<string | null>) => {
      state.recipePrepStepWarning = action.payload;
    },
    addRecipePreparationStep: (state, action: PayloadAction<string>) => {
      state.recipePreparationSteps.push(action.payload);
    },
    setRecipePreparationStepsWarning: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.recipePreparationStepsWarning = action.payload;
    },
    setRecipeImageUri: (state, action: PayloadAction<string | null>) => {
      state.recipeImageUri = action.payload;
    },
    setIsUploadingImage: (state, action: PayloadAction<boolean>) => {
      state.isUploadingImage = action.payload;
    },
    setImageTransferred: (state, action: PayloadAction<number | null>) => {
      state.imageTransferred = action.payload;
    },
    setRecipeImageWarning: (state, action: PayloadAction<string | null>) => {
      state.recipeImageWarning = action.payload;
    },
    setRecipeImageURL: (state, action: PayloadAction<string | null>) => {
      state.recipeImageURL = action.payload;
    },
    resetAddRecipeState: state => {
      // TODO: must be a better way ?!
      state.isLoading = initialState.isLoading;
      state.loadingText = initialState.loadingText;
      state.recipeName = initialState.recipeName;
      state.recipeNameWarning = initialState.recipeNameWarning;
      state.recipeDuration = initialState.recipeDuration;
      state.recipeDurationWarning = initialState.recipeDurationWarning;
      state.recipeServings = initialState.recipeServings;
      state.recipeServingsWarning = initialState.recipeServingsWarning;
      state.recipeCategory = initialState.recipeCategory;
      state.recipeCategoryWarning = initialState.recipeCategoryWarning;
      state.recipeIngredients = initialState.recipeIngredients;
      state.recipeIngredientsWarning = initialState.recipeIngredientsWarning;
      state.ingredientName = initialState.ingredientName;
      state.ingredientNameWarning = initialState.ingredientNameWarning;
      state.ingredientAmount = initialState.ingredientAmount;
      state.ingredientAmountWarning = initialState.ingredientAmountWarning;
      state.ingredientMeasurement = initialState.ingredientMeasurement;
      state.ingredientMeasurementWarning = initialState.ingredientMeasurement;
      state.recipePrepStep = initialState.recipePrepStep;
      state.recipePrepStepWarning = initialState.recipePrepStepWarning;
      state.recipePreparationSteps = initialState.recipePreparationSteps;
      state.recipeImageUri = initialState.recipeImageUri;
      state.isUploadingImage = initialState.isUploadingImage;
      state.imageTransferred = initialState.imageTransferred;
      state.recipePreparationStepsWarning =
        initialState.recipePreparationStepsWarning;
    },
  },
});

export const {
  setIsLoading,
  setLoadingText,
  setRecipeName,
  setRecipeNameWarning,
  setRecipeDuration,
  setRecipeDurationWarning,
  setRecipeServings,
  setRecipeServingsWarning,
  setRecipeCategory,
  setRecipeCategoryWarning,
  setIngredientName,
  setIngredientNameWarning,
  setIngredientAmount,
  setIngredientAmountWarning,
  setIngredientMeasurement,
  setIngredientMeasurementWarning,
  setRecipeIngredientsWarning,
  addIngredient,
  setRecipePrepStep,
  setRecipePrepStepWarning,
  addRecipePreparationStep,
  setRecipePreparationStepsWarning,
  setRecipeImageUri,
  setIsUploadingImage,
  setImageTransferred,
  setRecipeImageWarning,
  setRecipeImageURL,
  resetAddRecipeState,
} = AddRecipeSlice.actions;

export default AddRecipeSlice.reducer;
