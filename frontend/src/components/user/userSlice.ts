import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../source/store';

// -- Interfaces

interface UserState {
  authenticated: boolean;
  loginInProgress: boolean;
  signUpInProgress: boolean;
  loginError: string;
  signUpErrors: string[];
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password1: string;
  password2: string;
}

export interface LoginResultPayload {
  error: boolean;
  errorMessage: string;
}

const initialState: UserState = {
  authenticated: false,
  loginInProgress: false,
  signUpInProgress: false,
  loginError: '',
  signUpErrors: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authFail: (state) => {
      state.authenticated = false;
    },
    authSuccess: (state) => {
      state.authenticated = false;
    },
    authFailed: (state) => {
      state.authenticated = false;
    },
    doLogin: (state, action: PayloadAction<SignInPayload>) => {
      state.loginInProgress = true;
    },
    doneLogin: (state, action: PayloadAction<LoginResultPayload>) => {
      state.authenticated = !action.payload.error;
      state.loginInProgress = false;
      state.loginError = action.payload.errorMessage;
    },
    doSignUp: (state, action: PayloadAction<SignUpPayload>) => {
      state.signUpInProgress = true;
    },
    doneSignUp: (state, action: PayloadAction<string[]>) => {
      state.authenticated = action.payload.length == 0;
      state.signUpInProgress = false;
      state.signUpErrors = action.payload;
    },
    doSignOut: (state) => {
      state.authenticated = false;
    },
  },
});

// -- Actions

export const {
  authFailed,
  doLogin,
  doneLogin,
  doSignUp,
  doneSignUp,
  doSignOut,
} = userSlice.actions;

// -- Selectors

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
