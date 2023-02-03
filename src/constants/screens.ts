export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Onboarding: undefined;
  Tabs: undefined;
  Search: undefined;
  Recipe: undefined;
  NoInternet: undefined;
};

export const Screens: {
  SPLASH: keyof RootStackParamList;
  LOGIN: keyof RootStackParamList;
  ONBOARDING: keyof RootStackParamList;
  TABS: keyof RootStackParamList;
  SEARCH: keyof RootStackParamList;
  RECIPE: keyof RootStackParamList;
  NO_INTERNET: keyof RootStackParamList;
} = {
  SPLASH: "Splash",
  LOGIN: "Login",
  ONBOARDING: "Onboarding",
  TABS: "Tabs",
  SEARCH: "Search",
  RECIPE: "Recipe",
  NO_INTERNET: "NoInternet",
};

export type RootTabsParamList = {
  Home: undefined;
  Search: undefined;
  AddRecipe: undefined;
  Profile: undefined;
};
export const TabsScreens: {
  HOME: keyof RootTabsParamList;
  SEARCH: keyof RootTabsParamList;
  ADD_RECIPE: keyof RootTabsParamList;
  PROFILE: keyof RootTabsParamList;
} = {
  HOME: "Home",
  SEARCH: "Search",
  ADD_RECIPE: "AddRecipe",
  PROFILE: "Profile",
};
