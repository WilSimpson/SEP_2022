import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { LOGIN_USER, LOGOUT_USER REGISTER_USER } from "./types";

const initialState = {
  authenticated: false
};

const API_URL = 'http://localhost:8000/';

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

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, authenticated: true };

    case LOGOUT_USER:
      return { ...state, authenticated: false};

    case REGISTER_USER:
      return { ...state, authenticated: true};

    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore() {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor, API_URL }
}