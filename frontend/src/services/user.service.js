import axios from 'axios';
import {authHeader} from './auth.service';
const API_URL = 'http://localhost:8000/';

class UserService {
  getUser() {
    return axios.get(API_URL + 'user', {headers: authHeader()});
  }
}
export default new UserService();
