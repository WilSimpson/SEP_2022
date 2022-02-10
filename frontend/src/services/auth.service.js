import axios from 'axios';

// does this have to be the port the backend runs on?
const API_URL = 'http://localhost:3000/api/auth'

class AuthService {
    login(email, password) {
        return axios.post(API_URL + 'signin', {
            email,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
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