import axios from 'axios';
import jwt_decode from 'jwt-decode';
import configureStore from '../store/store';
import { LOGIN_USER, LOGOUT_USER } from '../store/types';
import { User } from '../models/user.model';


const {persistor, store, API_URL} = configureStore();

class AuthService {
    login(email, password) {
        return axios.post(API_URL + 'api/token/', {
            'email': email,
            'password': password
        })
        .then(response => {
            if (response.status === 200) {
                var token = response.data;
                var decoded = jwt_decode(token.access);
                const user = new User(decoded.email,'', '' , decoded.role, response.data);
                localStorage.setItem('user', JSON.stringify(user));
                store.dispatch({
                    type: LOGIN_USER
                });
            }
            return response;
        });
    }

    logout() {
        localStorage.removeItem('user');
        store.dispatch({
            type: LOGOUT_USER
        });
        window.location.href = "/login";
    }

    currentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    isLoggedIn() {
        return (localStorage.getItem('user') !== null);
    }
}

export default new AuthService();