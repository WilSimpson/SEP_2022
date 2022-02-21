import 'jsdom-global/register';
import '../setupTests';
import AuthService from '../services/auth.service';
import axios from 'axios';

jest.mock('axios');

describe('AuthService', () => {
    
   describe('login', () => {
       it ('should return the post response on success', () => {
            const response = {
                response: [{
                    status: 200,
                    data: 'access-token'
                }],
            }
            axios.post.mockResolvedValue(response);

            const result = AuthService.login('valid@email.com', 'morethan6');
            expect(result).toEqual(Promise.resolve(response));
       });

       it ('should return the post response on fail', () => {
        const response = {
            response: [{
                status: 401,
                data: 'access-token'
            }],
        }
        axios.post.mockResolvedValue(response);

        const result = AuthService.login('valid@email.com', 'morethan6');
        expect(result).toEqual(Promise.resolve(response));
   });
   });
});