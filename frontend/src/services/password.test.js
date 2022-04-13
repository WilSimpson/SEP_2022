import '../setupTests';
import PasswordService from './password';
import axios from 'axios';

jest.mock('axios');


describe('Password Service', () => {
    describe('checkEmail', () => {
      it('should return response on success', async () => {
        const response = {
          response: [
            {
              status: 200,
              data: {
                token: 'eefojijfo'
              },
            },
          ],
        };
        axios.post.mockResolvedValue(response);
        const result = await PasswordService.checkEmail('valid@valid.com');
        expect(result).toEqual(response);
      });
  
      it('returns response on failure', async () => {
        const response = {
          response: [
            {
              status: 400,
            },
          ],
        };
        axios.post.mockResolvedValue(response);
  
        const result = await PasswordService.checkEmail('not');
        expect(result).toEqual(response);
      });
    });

    describe('changePassword', () => {
        it('should return response on success', async () => {
          const response = {
            response: [
              {
                status: 200,
                data: {
                  password: 'eefojijfo',
                  token: 'efeffeef'
                },
              },
            ],
          };
          axios.post.mockResolvedValue(response);
          const result = await PasswordService.changePassword('wdwdwdwdwd', 'veryValidPassword');
          expect(result).toEqual(response);
        });
    
        it('returns response on failure', async () => {
          const response = {
            response: [
              {
                status: 400,
              },
            ],
          };
          axios.post.mockResolvedValue(response);
    
          const result = await PasswordService.changePassword('not', 'veryValidPassword');
          expect(result).toEqual(response);
        });
      });
});