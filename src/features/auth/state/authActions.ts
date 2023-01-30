import { navigate, resetTo } from "../../../navigation/RootNavigation";
import { AppThunk } from "../../../store/store";
import {
  resetAuthState,
  setIsLoading,
  setLanguage,
  setShowLogin,
  setShowRegister,
  setUserName,
} from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../translations/i18n";
import auth from "../../../../firebase";
import NetInfo from "@react-native-community/netinfo";
import { HE } from "../../../models/translations";
import { validateEmail, validatePassword } from "../../../utils/validators";

const asyncStorageKeys = {
  IS_DELETE_REQUESTED: "isDeleteUserRequested",
  DID_SEE_ONBOARDING: "onboardingSeen",
};

const authSections = {
  LOGIN: "login",
  REGISTer: "registration",
};

// =============== APP INIT =============== //

export const appInit =
  (onAppIsReady: (state: boolean) => void): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    try {
      registerNetworkEventListener();
      auth.onAuthStateChanged(async (user) => {
        try {
          const shouldNavigateToOnboarding = await !checkUserSeenOnboarding();
          if (shouldNavigateToOnboarding) {
            resetTo("Onboarding");
            onAppIsReady(true);
          } else if (user && user.email) {
            resetTo("Tabs");
            onAppIsReady(true);
          } else if (!user) {
            resetTo("Login");
            onAppIsReady(true);
          }
        } catch (error) {
          console.error(error); // TODO: Error Handling
        }
      });
    } catch (e) {
      console.error(e); // TODO: Error Handling
    } finally {
      onAppIsReady(true);
    }
  };

const checkUserSeenOnboarding = async () => {
  const didSee = await AsyncStorage.getItem(
    asyncStorageKeys.DID_SEE_ONBOARDING
  );
  if (didSee == null) {
    return false;
  } else {
    return true;
  }
};

export const saveOnboardingFinished = () => {
  AsyncStorage.setItem(asyncStorageKeys.DID_SEE_ONBOARDING, "true");
};

export const detectLanguage = (): AppThunk => (dispatch) => {
  try {
    if (i18n.locale === HE) {
      dispatch(setLanguage("he"));
    } else {
      dispatch(setLanguage("en"));
    }
  } catch (error) {
    console.log(error); // TODO: Error Handling
  }
};

const registerNetworkEventListener = () => {
  NetInfo.addEventListener((listener) => {
    if (!listener.isConnected) {
      navigate("NoInternet");
    }
  });
};

// =============== LOGIN =============== //

export const updateAuthSection =
  (newSection: string): AppThunk =>
  async (dispatch) => {
    if (newSection === authSections.LOGIN) {
      dispatch(setShowLogin(true));
    } else {
      dispatch(setShowRegister(true));
    }
  };

export const logUserIn =
  (email: string | null, password: string | null): AppThunk =>
  (dispatch) => {
    if (validateEmail(email) && validatePassword(password)) {
      try {
        dispatch(setIsLoading(true));
        signInToFirebase(email!.trim(), password!.trim());
      } catch (error) {
        console.log(error); // TODO: Error Handling
        dispatch(setIsLoading(false));
      }
    } else {
      return;
    }
  };

export const registerUser =
  (
    email: string | null,
    password: string | null,
    surname: string | null
  ): AppThunk =>
  async (dispatch) => {
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validateName(surname)
    ) {
      try {
        dispatch(setIsLoading(true));
        await auth.createUserWithEmailAndPassword(
          email!.trim(),
          password!.trim()
        );
        await auth.currentUser?.updateProfile({ displayName: surname });
        dispatch(setUserName(surname));
      } catch (error) {
        dispatch(setIsLoading(false));
        console.log(error); // TODO: Error Handling
      }
    } else {
      return;
    }
  };

// =============== AUTH =============== //

export const getCurrentUserID = () => {
  try {
    return auth.currentUser?.uid;
  } catch (error) {
    console.log(error); // TODO: Error Handling
  }
};

export const signInToFirebase = async (email: string, password: string) => {
  await auth.signInWithEmailAndPassword(email, password);
};

// TODO: why AppThunk fucks this up ???
export const signOutFromFirebase = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await auth.signOut();
    dispatch(resetAuthState());
    resetTo("Login");
  } catch (error) {
    console.log(error); // TODO: Error Handling
  }
};

export const printCurrentUser = () => {
  try {
    console.log(auth.currentUser?.email);
    console.log(auth.currentUser?.displayName);
    console.log(auth.currentUser?.uid);
  } catch (error) {
    console.log(error);
  }
};
