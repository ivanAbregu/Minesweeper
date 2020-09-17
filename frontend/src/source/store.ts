import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';

import { initApp } from '../components/app/actions';
import userReducer from '../components/user/userSlice';
import gameSlice from '../components/game/gameSlice';

import { root } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(), sagaMiddleware];

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameSlice,
  },
  middleware,
  devTools: true,
});

sagaMiddleware.run(root);

store.dispatch(initApp());

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
