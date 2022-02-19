import axios from 'axios';

// does this have to be the port the backend runs on?
const API_URL = 'http://localhost:8000/'

class AuthService {
    login(email, password) {
        return axios.post(API_URL + 'api/token/', {
            'email': email,
            'password': password
        })
        .then(response => {
            console.log(response);
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
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