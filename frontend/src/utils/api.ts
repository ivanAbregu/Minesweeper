import { call } from 'redux-saga/effects';
import { authorized } from './auth';

export function* signOut() {
  localStorage.removeItem('token');
}

export function* createGame() {
  const response = yield call(
    authorized.post,
    `${process.env.REACT_APP_API_BASE_URL}/api/v1/game/`,
    {
      row_size: 6,
      column_size: 6,
      mines_size: 4,
    }
  );
  return yield call([response, 'json']);
}

export function* updateGame(game_id: number, cell_id: number, flag?: boolean) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/game/${game_id}/`;
  let body = flag === undefined ? { cell_id } : { cell_id, flag };
  const response = yield call(authorized.patch, url, body);
  return yield call([response, 'json']);
}
