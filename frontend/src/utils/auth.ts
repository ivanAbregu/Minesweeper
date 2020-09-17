import { call, put } from 'redux-saga/effects';
import { authFailed } from '../components/user/userSlice';

// -- Interfaces

interface headers {
  [k: string]: string;
}

interface settings {
  method: string;
  headers?: headers;
  body?: string;
}

// -- Helpers

function get_credentials() {
  return {
    token: localStorage.getItem('token') || '',
  };
}

function addAuthHeaders(config: settings): settings {
  const credentials = get_credentials();
  return {
    ...config,
    headers: {
      ...config.headers,
      authorization: `Token ${credentials.token}`,
    },
  };
}

function* fetchAuthorized(url: string, config: settings) {
  const response = yield call(fetch, url, addAuthHeaders(config));
  if (response.status === 401) {
    yield put(authFailed());
  }
  return response;
}

export const authorized = {
  get: (url: string, headers?: object) => {
    const config = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
    };
    return fetchAuthorized(url, config);
  },
  delete: (url: string) => {
    const config = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    };
    return fetchAuthorized(url, config);
  },
  post: (url: string, body: any) => {
    const config = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    };
    return fetchAuthorized(url, config);
  },
  patch: (url: string, body: any) => {
    const config = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    };
    return fetchAuthorized(url, config);
  },
};
