import { navigate, resetTo } from "../../../navigation/RootNavigation";
import { AppThunk } from "../../../store/store";
import {
  resetAuthState,
  setEmailWarning,
  setIsLoading,
  setLanguage,
  setNameWarning,
  setPasswordWarning,
  setShowLogin,
  setShowRegister,
  setUserName,
} from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../translations/i18n";
import auth from "../../../../firebase";
import NetInfo from "@react-native-community/netinfo";

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
    const currentLanguage = i18n.locale;
    if (currentLanguage === "he" || currentLanguage === "he-IL") {
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

export const validateEmail =
  (email: string | null): AppThunk =>
  async (dispatch) => {
    if (email) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!reg.test(email.trim())) {
        dispatch(setEmailWarning("מייל אינו תקין"));
        return false;
      } else {
        dispatch(setEmailWarning(null));
        return true;
      }
    } else {
      dispatch(setEmailWarning("יש להזין כתובת אימייל"));
      return false;
    }
  };

export const validatePassword =
  (password: string | null): AppThunk =>
  async (dispatch) => {
    if (password) {
      var reg =
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
      if (!reg.test(password.trim())) {
        dispatch(setPasswordWarning("סיסמה אינה חזקה מספיק"));
        return false;
      } else {
        dispatch(setPasswordWarning(null));
        return true;
      }
    } else {
      dispatch(setPasswordWarning("יש להזין סיסמה"));
      return false;
    }
  };

export const validateName =
  (name: string | null): AppThunk =>
  async (dispatch) => {
    if (name) {
      if (name.length === 0) {
        dispatch(setNameWarning("יש להזין שם או כינוי"));
        return false;
      } else if (name.length < 2) {
        dispatch(setNameWarning("כינוי קצר מדי"));
        return false;
      } else {
        dispatch(setNameWarning(null));
        return true;
      }
    } else {
      dispatch(setNameWarning("יש להזין שם או כינוי"));
      return false;
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
