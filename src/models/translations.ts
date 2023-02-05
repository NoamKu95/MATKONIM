export interface TranslationsUnion {
  fallback: "he";
  he: Translation;
  en: Translation;
}

export interface Translation {
  appName: string;
  tabs: {
    Home: string;
    ActionButton: string;
    Profile: string;
  };
  auth: {
    login: string;
    signup: string;
    mainTitle: string;
    secondaryTitle: string;
    loginSection: {
      emailPlaceholder: string;
      passwordPlaceholder: string;
      goRegister: string;
    };
    registerSection: {
      namePlaceholder: string;
      emailPlaceholder: string;
      passwordPlaceholder: string;
      goLogin: string;
    };
  };
  homepage: {
    whatCookingToday: string;
    hiThere: string;
    callout: {
      mainText: string;
      pressableText: string;
    };
    search: string;
    recentlyAddedTitle: string;
    noAddedRecipes: string;
    addRecipeText: string;
    categories: string;
  };
  search: {
    mainTitle: string;
    secondaryTitle: string;
    searchPlaceholder: string;
    leadingText: string;
    noResults: string;
  };
  recipeCard: {
    servings: string;
  };
  recipe: {
    ingredients: string;
    preparationSteps: string;
  };
  profile: {
    logout: string;
    heyUser: string;
    personalText: string;
    numberOfRecipes: string;
  };
  addRecipe: {
    mainTitle: string;
    subtitleText: string;
    infoTitle: string;
    recipeNameLabel: string;
    recipeNameExample: string;
    recipeDurationLabel: string;
    recipeDurationExample: string;
    recipeServingsLabel: string;
    recipeServingsExample: string;

    ingredientsTitle: string;
    ingredientsSubTitle: string;
    ingredientNameLabel: string;
    ingredientNameExample: string;
    ingredientAmountLabel: string;
    ingredientAmountExample: string;
    ingredientAddButton: string;

    prepStepsTitle: string;
    prepStepsSubTitle: string;
    prepSteps_StepLabel: string;
    prepSteps_StepExample: string;
    prepStepsAddButton: string;

    recipeImageTitle: string;
    recipeImageSubTitle: string;

    categoriesTitle: string;
    categoriesSubTitle: string;

    saveButton: string;
    loaderText: string;
    imageUploadingText: string;
  };
  errorHandling: {
    somethingWentWrong: string;
    noInternetTitle: string;
    noInternetDescription: string;
    noInternetButtonLabel: string;
    validationErrors: {
      emptyEmail: string;
      invalidEmail: string;
      emptyPassword: string;
      weakPassword: string;
      emptyUsername: string;
      shortUsername: string;
      mandatoryField: string;
      specialCharactersIssue: string;
      contentTooShort: string;
      numBelowZero: string;
      PrepStepSectionError: string;
      IngredientsSectionError: string;
      CategorySectionError: string;
      ImageSelectionSectionError: string;
      formIncomplete: string;
    };
    FirebaseErrors: {
      invalidImageUrl: string;
    };
  };
}

// representations of Hebrew language in different devices
export enum Hebrew {
  WI = "wi",
  IW = "iw",
  HE = "he",
}

export const HE = "he";
export const EN = "en";
