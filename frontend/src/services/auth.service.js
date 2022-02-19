import axios from 'axios';
import store from '../store/store';
import { LOGIN_USER } from '../store/types';

// does this have to be the port the backend runs on?
const API_URL = 'http://localhost:8000/'

class AuthService {
    login(email, password) {
        return axios.post(API_URL + 'api/token/', {
            'email': email,
            'password': password
        })
        .then(response => {
            console.log(response.status);
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                store.dispatch({
                    type: LOGIN_USER,
                    authenticated: true
                });
            }
            
            return response;
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();