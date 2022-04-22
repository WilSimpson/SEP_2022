import axios from 'axios';
import {authHeader} from './auth';
import {API_URL} from '../store/store';

class UserService {
  getUser() {
    return axios.get(API_URL + '/users/', {headers: authHeader()});
  }
}
export default new UserService();
