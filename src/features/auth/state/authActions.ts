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
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../utils/validators";
import { collections } from "../../../models/types";
import {
  addFileToCollection,
  readFileFromCollection,
} from "../../../managers/firestoreManager";
import { UserBasicData } from "../../../models/userBasicData";
import { setSelectedAvatar } from "../../profile/state/profileSlice";
import { Avatar } from "../../../models/avatar";
import {
  ANIMAL_AVATARS,
  FEMALE_AVATARS,
  MALE_AVATARS,
} from "../../../constants/dataArrays";

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
        getLoggedUserDetails();
      } catch (error) {
        console.log(error); // TODO: Error Handling - "login failed"
        dispatch(setIsLoading(false));
      }
    } else {
      // TODO: Error Handling - "incorrect login info"
      return;
    }
  };

export const getLoggedUserDetails = (): AppThunk => async (dispatch) => {
  try {
    const uid = getCurrentUserID();
    const user = await readFileFromCollection(collections.USERS, uid ?? "");

    if (user) {
      const avatarsArr =
        ANIMAL_AVATARS.concat(FEMALE_AVATARS).concat(MALE_AVATARS);
      const userAvatar = avatarsArr.find((avatar) => {
        return avatar.name === user.avatar;
      });
      dispatch(setSelectedAvatar(userAvatar));
      dispatch(setUserName(user.userName));
    }
  } catch (err) {
    console.log(err); // TODO: Error Handling
  }
};

// =============== REGISTER =============== //

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
        if (auth.currentUser) {
          createUserInFirestoreCollection(auth.currentUser?.uid, surname ?? "");
        }
      } catch (error) {
        dispatch(setIsLoading(false));
        console.log(error); // TODO: Error Handling - "registration failed"
      }
    } else {
      return;
    }
  };

const createUserInFirestoreCollection = (uid: string, userName: string) => {
  try {
    const newUser: UserBasicData = {
      avatar: "snake",
      userName,
    };
    addFileToCollection(collections.USERS, uid, newUser);
  } catch (err) {
    console.log(err); // TODO: Error Handling - "registration not fully completed"
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
