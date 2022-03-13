import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import {LOGIN_USER, LOGOUT_USER} from './types';

const initialState = {
  authenticated: false,
};

const API_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 
  'http://localhost:8000' : 'https://sep22.forever.dev/api';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined' ?
    createWebStorage('local') :
    createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, authenticated: true};

    case LOGOUT_USER:
      return {...state, authenticated: false};

    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore() {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return {store, persistor, API_URL};
}
