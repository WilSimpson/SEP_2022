import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LOGIN_USER, LOGOUT_USER } from "./types";

const intitialState = {
  authenticated: false
};

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, authenticated: true };

    case LOGOUT_USER:
      return { ...state, authenticated: false};

    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore() {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}