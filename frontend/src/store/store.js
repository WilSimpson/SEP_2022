import { createStore } from "redux";
import { LOGIN_USER } from "./types";

const intitialState = {
  authenticated: false
};

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, authenticated: true };
    
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;