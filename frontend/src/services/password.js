import axios from 'axios';
import {API_URL} from '../store/store';

class PasswordService {
  checkEmail(user) {
    return axios.post(API_URL + '/password_reset/', {email: user});
  }
}
export default new PasswordService();
