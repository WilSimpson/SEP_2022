import axios from 'axios';
import jwtDecode from 'jwt-decode';
import configureStore from '../store/store';
import {API_URL} from '../store/store';
import {LOGIN_USER, LOGOUT_USER} from '../store/types';
import {User} from '../models/user';

const {store} = configureStore();

export function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token.access) {
    return {Authorization: 'Bearer ' + user.token.access};
  } else {
    return {};
  }
}

class AuthService {
  login(email, password) {
    return axios
        .post(API_URL + '/token/', {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            const token = response.data;
            const decoded = jwtDecode(token.access);
            const user = new User(
                decoded.email,
                '',
                '',
                decoded.role,
                response.data,
                decoded.id,
            );
            localStorage.setItem('user', JSON.stringify(user));
            store.dispatch({
              type: LOGIN_USER,
            });
          }
          return response;
        });
  }

  logout() {
    localStorage.removeItem('user');
    store.dispatch({
      type: LOGOUT_USER,
    });
    window.location.href = '/login';
  }

  currentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    user.__proto__ = User.prototype;
    return user;
  }

  register(email, password, firstname, lastname, role) {
    return axios
        .post(API_URL + '/users/', {
          email: email,
          password: password,
          first_name: firstname,
          last_name: lastname,
          role: role,
        });
  }

  isLoggedIn() {
    return localStorage.getItem('user') !== null;
  }
}

export default new AuthService();
