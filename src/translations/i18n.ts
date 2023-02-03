import { I18n } from "i18n-js";
import { I18nManager, NativeModules, Platform } from "react-native";
import { EN, HE, Hebrew, TranslationsUnion } from "../models/translations";

export const translations: TranslationsUnion = {
  fallback: "he",
  he: {
    appName: "MATKONIM",
    tabs: {
      Home: "בית",
      ActionButton: "פעולות",
      Profile: "פרופיל",
    },
    auth: {
      login: "התחברות",
      signup: "הרשמה",
      mainTitle: "דפדפו במתכונים המועדפים עליכם בקלות",
      secondaryTitle:
        "שמרו את כל המתכונים שלכם במקום אחד נוח לגישה בכל זמן ובכל מקום",
      loginSection: {
        emailPlaceholder: "כתובת המייל שלך",
        passwordPlaceholder: "הסיסמה שלך",
        goRegister: "לא פתחת חשבון עדיין?",
      },
      registerSection: {
        namePlaceholder: "השם / כינוי שלך",
        emailPlaceholder: "כתובת המייל שלך",
        passwordPlaceholder: "הסיסמה שלך",
        goLogin: "כבר יש לך חשבון?",
      },
    },
    homepage: {
      whatCookingToday: "מה אנחנו מבשלים היום?",
      hiThere: "היי",
      callout: {
        mainText:
          "שמרו את כל המתכונים שלכם נגישים במקום אחד ודפדפו בהם בכל זמן ובכל מקום",
        pressableText: "כל המתכונים",
      },
      search: "מה אנחנו מבשלים היום?",
      recentlyAddedTitle: "נוספו לאחרונה",
      noAddedRecipes: "עדיין לא הוספת מתכונים..\nלמה לא להתחיל כבר עכשיו?",
      addRecipeText: "להוספת המתכון הראשון שלך",
      categories: "קטגוריות",
    },
    search: {
      mainTitle: "חפש במתכונים שלך",
      secondaryTitle: "לגלות מחדש את המנות הטעימות שלך",
      searchPlaceholder: "מה אנחנו מבשלים היום?",
      leadingText: "מביאים את המתכונים עבורך",
      noResults: `לא מצאנו תוצאות מתאימות\nכדאי לנסות חיפוש אחר`,
    },
    recipeCard: {
      servings: "סועדים",
    },
    recipe: {
      ingredients: "מצרכים",
      preparationSteps: "שלבי הכנה",
    },
    profile: {
      logout: "התנתקות",
      heyUser: "היי, ",
      personalText:
        "איזה כיף שבחרת להשתמש באפליקציית מתכונים! אם נהנית זה הזמן לזרוק מילה טובה לחברים :)",
    },
    addRecipe: {
      mainTitle: "הוספת מתכון חדש",
      subtitleText:
        "יש לך מתכון חדש להוסיף? מרגש!\nאוטוטו הוא לנצח אצלך בנייד במרחק הקלקה",
      infoTitle: "מידע בסיסי",
      recipeNameLabel: "שם המתכון",
      recipeNameExample: "לדוגמה: פסטה שמנת עם ברוקולי",
      recipeDurationLabel: "משך הכנה",
      recipeDurationExample: "לדוגמה: 1.5 שעות",
      recipeServingsLabel: "כמות מנות",
      recipeServingsExample: "לדוגמה: 4",

      ingredientsTitle: "מצרכים נדרשים",
      ingredientsSubTitle:
        "כדי שנדע מה צריך כשהולכים לעשות סופר בבית של ההורים",
      ingredientNameLabel: "שם המצרך",
      ingredientNameExample: "לדוגמה: גבינת צ׳דר מגורדת",
      ingredientAmountLabel: "כמות נדרשת",
      ingredientAmountExample: "לדוגמה: 250",
      ingredientAddButton: "הוספת מצרך",

      prepStepsTitle: "שלבי הכנה",
      prepStepsSubTitle: "משקיעים בהנחיות ברורות עכשיו - מבשלים בקלות אחר כך",
      prepSteps_StepLabel: "הנחיות לשלב",
      prepSteps_StepExample: "לדוגמה: קוצצים בצל לקוביות קטנות",
      prepStepsAddButton: "הוספת שלב",

      categoriesTitle: "קטגוריית המתכון",
      categoriesSubTitle: "כדי למצוא את המתכון יותר בקלות במועד מאוחר יותר",

      recipeImageTitle: "בחירת תמונה",
      recipeImageSubTitle: "תמונה טובה תמיד עושה חשק",

      saveButton: "שמירת מתכון",
      loaderText: "עובדים על לשמור לך את המתכון!",
      imageUploadingText: "מעלים את התמונה שלך לענן - ",
    },
    errorHandling: {
      somethingWentWrong: "אופס, נראה שמשהו השתבש",
      noInternetTitle: "אין אינטרנט",
      noInternetDescription:
        "אופס, נראה שיש מחסור באינטרנט במכשיר שלך כרגע!\n\nיש לבדוק את הנושא ולוודא שחיבור האינטרנט חזר ויציב לפני שממשיכים חזרה לאפליקציה, אחרת היא עלולה לא לפעול כמו שצריך",
      noInternetButtonLabel: "סידרתי את הנושא, אפשר לחזור",
      validationErrors: {
        emptyEmail: "יש להזין כתובת אימייל",
        invalidEmail: "מייל אינו תקין",
        emptyPassword: "יש להזין סיסמה",
        weakPassword: "סיסמה אינה חזקה מספיק",
        emptyUsername: "יש להזין שם או כינוי",
        shortUsername: "כינוי קצר מדי",
        mandatoryField: "שדה חובה",
        specialCharactersIssue: "לא ניתן להזין תווים מיוחדים",
        contentTooShort: "התוכן שהוזן קצר מדי",
        numBelowZero: "לא ניתן להזין ערך קטן או שווה לאפס",
        PrepStepSectionError: "חובה להזין שלבי הכנה",
        IngredientsSectionError: "חובה להזין מצרכים נדרשים",
        CategorySectionError: "חובה לבחור קטגוריה למתכון",
        ImageSelectionSectionError: "חובה להוסיף תמונה למתכון",
        formIncomplete: "אופס, נראה שיש צורך לתקן משהו בטופס",
      },
      FirebaseErrors: {
        invalidImageUrl:
          "אופס, נראה שיש בעיה עם ההורדה של אחת או יותר מהתמונות ולכן ייתכן שיופיעו תמונות חסרות",
      },
    },
  },
  en: {
    appName: "MATKONIM",
    tabs: {
      Home: "Home",
      ActionButton: "Actions",
      Profile: "Profile",
    },
    auth: {
      login: "Login",
      signup: "Signup",
      mainTitle: "Browse your favorite recipes easily",
      secondaryTitle:
        "Save all of your recipes in one place,\naccessible anytime & anywhere",
      loginSection: {
        emailPlaceholder: "Your email adress",
        passwordPlaceholder: "Your password",
        goRegister: "Not registered yet?",
      },
      registerSection: {
        namePlaceholder: "Your name / nickname",
        emailPlaceholder: "Your email adress",
        passwordPlaceholder: "Your password",
        goLogin: "Already have an account?",
      },
    },
    homepage: {
      whatCookingToday: "What are we cooking today?",
      hiThere: "Hey",
      callout: {
        mainText:
          "Save all of your recipes in one place - accessible anytime & anywhere",
        pressableText: "All recipes",
      },
      search: "What are we cooking today?",
      recentlyAddedTitle: "Added recently",
      noAddedRecipes:
        "You haven't added any recipes yet..\nwhy not start right now?",
      addRecipeText: "Add your first recipe",
      categories: "Categories",
    },
    search: {
      mainTitle: "Browse your recipes",
      secondaryTitle: "Re-discover your delicious dishes",
      searchPlaceholder: "What are we cooking today?",
      leadingText: "Fetching recipes for you",
      noResults: `We couldn't find any matching results\nYou should try a different search`,
    },
    recipeCard: {
      servings: "Servings",
    },
    recipe: {
      ingredients: "Ingredients",
      preparationSteps: "Preperation steps",
    },
    profile: {
      logout: "Logout",
      heyUser: "Hey, ",
      personalText:
        "Happy to see your are using the MATKONIM app :) If you enjoy the app, please recommend to your friends",
    },
    addRecipe: {
      mainTitle: "Add new recipe",
      subtitleText:
        "Have a new recipe to add? Exciting!\nIn no time it will forever be one click away",
      infoTitle: "Basic info",
      recipeNameLabel: "Recipe name",
      recipeNameExample: "example: rose pasta with mushrooms",
      recipeDurationLabel: "Duration",
      recipeDurationExample: "example: 1.5 hours",
      recipeServingsLabel: "Servings",
      recipeServingsExample: "example: 4",

      ingredientsTitle: "Required ingredients",
      ingredientsSubTitle: "So we can know what to barrow from the neighbors",
      ingredientNameLabel: "Ingredient name",
      ingredientNameExample: "example: cheder cheese",
      ingredientAmountLabel: "Required amount",
      ingredientAmountExample: "example: 250",
      ingredientAddButton: "Add ingredient",

      prepStepsTitle: "Preperation steps",
      prepStepsSubTitle: "Clear instructions now = easy cooking later!",
      prepSteps_StepLabel: "Step instructions",
      prepSteps_StepExample: "example: chop the onion into small cubes",
      prepStepsAddButton: "Add step",

      categoriesTitle: `Recipe's category`,
      categoriesSubTitle: "So we can easily find the recipe later",

      recipeImageTitle: "Pick image",
      recipeImageSubTitle: "A good photo always gives the munchies",

      saveButton: "Save recipe",
      loaderText: "Working on saving your new recipe!",
      imageUploadingText: "uploading your image to the could",
    },
    errorHandling: {
      somethingWentWrong: "Oops, Something went wrong",
      noInternetTitle: "No Internet Connection",
      noInternetDescription: "Oops, looks like you're out of internet!",
      noInternetButtonLabel: "Internet is back, let's go",
      validationErrors: {
        emptyEmail: "An email adress is required",
        invalidEmail: "Invalid email adress",
        emptyPassword: "A password is required",
        weakPassword: "Password isn't strong enough",
        emptyUsername: "A nickname is required",
        shortUsername: "Nickname is too short",
        mandatoryField: "This field is mandatory",
        specialCharactersIssue: "Input cannot include special characters",
        contentTooShort: "Input is too short",
        numBelowZero: "Value cannot be lower than zero",
        PrepStepSectionError: "Adding preperation steps is mandatory",
        IngredientsSectionError: "Adding ingredients is mandatory",
        CategorySectionError: "Choosing a category is mandatory",
        ImageSelectionSectionError: "Uploading an image is mandatory",
        formIncomplete: "Oops, looks like something in the form needs fixing",
      },
      FirebaseErrors: {
        invalidImageUrl:
          "Seems like there's an issue with one or more of the recipes' images, therefore one or more images may appear missing!",
      },
    },
  },
};

// get the device's language
export const findLng = () => {
  let lng = EN;
  if (Platform.OS === "android") {
    lng = NativeModules.I18nManager.localeIdentifier;
  } else if (Platform.OS === "ios") {
    lng = NativeModules.SettingsManager.settings.AppleLanguages[0];
  }
  if (lng && isHebrew(lng)) {
    return HE;
  }
  return EN;
};

// check if device's language is Hebrew
const isHebrew = (lng: string) => {
  return (
    lng.startsWith(Hebrew.HE) ||
    lng.startsWith(Hebrew.WI) ||
    lng.startsWith(Hebrew.IW)
  );
};

const i18n = new I18n(translations);
i18n.locale = findLng(); // determine language of app
i18n.enableFallback = true;
I18nManager.forceRTL(i18n.locale === "he"); // to make sure elements are aligned to the right and not only the texts are in Hebrew
export default i18n;
