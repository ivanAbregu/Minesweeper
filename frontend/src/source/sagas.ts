import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';

import { initApp } from '../components/app/actions';

import {
  doLogin,
  doneLogin,
  doSignOut,
  doSignUp,
  doneSignUp,
  SignInPayload,
  SignUpPayload,
} from '../components/user/userSlice';

import {
  GameUpdatePayload,
  doGetGame,
  doneGetGame,
  doUpdateGame,
  doneUpdateGame,
} from '../components/game/gameSlice';

import * as api from '../utils/api';

function* initAppSaga() {
  const token = localStorage.getItem('token');
  if (!!token && token !== 'undefined' && token !== 'null') {
    yield put(
      doneLogin({
        error: false,
        errorMessage: '',
      })
    );
  }
}

function* doLoginSaga(action: PayloadAction<SignInPayload>) {
  let errorMessage = '';

  try {
    yield fetch(`${process.env.REACT_APP_API_BASE_URL}/api/rest-auth/login/`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: action.payload.email,
        password: action.payload.password,
      }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.json();
          case 400:
          case 401:
            errorMessage = 'Could not log in, please check login credentials.';
            return {
              token: null,
              refresh: null,
            };
          default:
            errorMessage = 'Unknown error, please contact support.';
            return {
              token: null,
              refresh: null,
            };
        }
      })
      .then((json) => {
        const { key } = json;
        if (key) {
          localStorage.setItem('token', key);
        } else {
          localStorage.removeItem('token');
        }
      });

    if (errorMessage.length === 0) {
      yield put(
        doneLogin({
          error: false,
          errorMessage: '',
        })
      );
      yield put(initApp());
    } else {
      yield put(
        doneLogin({
          error: true,
          errorMessage: errorMessage,
        })
      );
    }
  } catch (e) {
    yield put(
      doneLogin({
        error: true,
        errorMessage: 'API is not responding, please try later',
      })
    );
  }
}

function* doSignUpSaga(action: PayloadAction<SignUpPayload>) {
  let is_result_success = false;
  let status_code = 201;
  let messages: string[] = [];

  try {
    is_result_success = yield fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/rest-auth/registration/`,
      {
        method: 'post',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: action.payload.email,
          password1: action.payload.password1,
          password2: action.payload.password2,
        }),
      }
    )
      .then((response) => {
        status_code = response.status;
        return response.json();
      })
      .then((json) => {
        if (status_code !== 201) throw json;
        const { key } = json;
        localStorage.setItem('token', key);
      });
  } catch (e) {
    messages = getMessagesFromError(e, status_code);
  }
  yield put(doneSignUp(messages));
}

function getMessagesFromError(
  errors: { [key: string]: [string] },
  status_code: number
) {
  let l: string[] = [];
  let result = ['Something went wrong!'];
  if (status_code == 400)
    result = Object.keys(errors).reduce((acc, cur) => {
      return ['email', 'password1', 'non_field_errors'].includes(cur) ? [...acc, ...errors[cur]] : acc;
    }, l);
  return result;
}

export function* getGameSaga(action: PayloadAction<SignInPayload>) {
  const result = yield call(api.createGame);
  yield put(doneGetGame(result));
}

export function* doUpdateGameSaga(action: PayloadAction<GameUpdatePayload>) {
  const result = yield call(
    api.updateGame,
    action.payload.game_id,
    action.payload.cell_id,
    action.payload.flag
  );
  yield put(doneUpdateGame(result));
}

export function* signOutSaga() {
  yield call(api.signOut);
}

export function* root() {
  yield takeEvery(initApp.type, initAppSaga);

  yield takeEvery(doLogin.type, doLoginSaga);
  yield takeEvery(doSignOut.type, signOutSaga);

  yield takeEvery(doSignUp.type, doSignUpSaga);

  yield takeEvery(doGetGame.type, getGameSaga);
  yield takeEvery(doUpdateGame.type, doUpdateGameSaga);
}
