import axios from 'axios';
import {API_URL} from '../store/store';

class PasswordService {
  checkEmail(user) {
    return axios.post(API_URL + '/password_reset/', {email: user});
  }
  changePassword(t, pw) {
    return axios.post(API_URL + '/password_reset/confirm/', {'password': pw.toString(), 'token': t.toString()});
  }
}
export default new PasswordService();
