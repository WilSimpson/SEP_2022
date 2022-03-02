import axios from 'axios';
import configureStore from '../store/store';
import { LOGIN_USER, LOGOUT_USER} from '../store/types';
import { User } from '../models';


const {persistor, store, API_URL} = configureStore();
let isLoggedIn = store.authenticated;

class AuthService {
    login(email, password) {
        return axios.post(API_URL + 'api/token/', {
            'email': email,
            'password': password
        })
        .then(response => {
            if (response.status === 200) {
                let user = new User('','', '' ,'', response.data);
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

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    register(email, password, firstname, lastname, role){
        return axios.post(API_URL + '/users', {
            'email': email,
            'password': password,
            'first': firstname,
            'last': lastname,
            'role': role
        })
    }
}

export default new AuthService();
export {isLoggedIn};