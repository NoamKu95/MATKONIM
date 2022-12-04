import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  userName: string | null;
  isShowLogin: boolean;
  isShowRegistration: boolean;
  emailWarning: string | null;
  passwordWarning: string | null;
  nameWarning: string | null;
  isLoading: boolean;
  language: 'en' | 'he';
}

const initialState: AuthState = {
  userName: null,
  isShowLogin: false,
  isShowRegistration: false,
  emailWarning: null,
  passwordWarning: null,
  nameWarning: null,
  isLoading: false,
  language: 'he',
};

export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      // TODO: replace with resetWarnings
      state.emailWarning = null;
      state.passwordWarning = null;
      state.nameWarning = null;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    resetAuthState: state => {
      state.isLoading = false;
      state = initialState; // TODO: why not working ???
    },
    setShowLogin: (state, action: PayloadAction<boolean>) => {
      state.isShowLogin = action.payload;
      // reset other states:
      state.isShowRegistration = !action.payload;
      // TODO: replace with resetWarnings
      state.emailWarning = null;
      state.passwordWarning = null;
      state.nameWarning = null;
    },
    setShowRegister: (state, action: PayloadAction<boolean>) => {
      state.isShowRegistration = action.payload;
      // reset other states:
      state.isShowLogin = !action.payload;
      // TODO: replace with resetWarnings
      state.emailWarning = null;
      state.passwordWarning = null;
      state.nameWarning = null;
    },
    setEmailWarning: (state, action: PayloadAction<string | null>) => {
      state.emailWarning = action.payload;
    },
    setPasswordWarning: (state, action: PayloadAction<string | null>) => {
      state.passwordWarning = action.payload;
    },
    setNameWarning: (state, action: PayloadAction<string | null>) => {
      state.nameWarning = action.payload;
    },
    resetWarnings: state => {
      state.emailWarning = null;
      state.passwordWarning = null;
      state.nameWarning = null;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'he'>) => {
      state.language = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setUser,
  setUserName,
  resetAuthState,
  setShowLogin,
  setShowRegister,
  setEmailWarning,
  setPasswordWarning,
  setNameWarning,
  resetWarnings,
  setLanguage,
} = AuthSlice.actions;

export default AuthSlice.reducer;
