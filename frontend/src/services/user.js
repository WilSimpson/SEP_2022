import axios from 'axios';
import {authHeader} from './auth.service';
import {API_URL} from '../store/store';

class UserService {
  getUser() {
    return axios.get(API_URL + '/user', {headers: authHeader()});
  }
}
export default new UserService();
