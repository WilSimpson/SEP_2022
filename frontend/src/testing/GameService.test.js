import '../setupTests';
import GameService from '../services/services';
import axios from 'axios';

jest.mock('axios');

describe('GameService', () => {
    
    describe('joinGame', () => {
        it ('should return a game object on success', () => {
             const response = {
                 response: [{
                     status: 200,
                     data: [
                        {
                          "id": '1',
                          'text': "This is the question itself",
                          "password": "psw",
                          "onlyChance": false,
                          "options": [
                              {
                              "text": "Option 1",
                              "link": "1a"
                                },
                                {
                                    "text": "Option 2",
                                    "link": "1b"
                                }
                            ],
                        }
                    ]
                }]
                }
             axios.post.mockResolvedValue(response);
 
             const result = GameService.joinGame('555555');
             expect(result).toEqual(Promise.resolve(response));
        });
 
        it ('no response on failure', async () => {
         const response = {
             response: [{
                 status: 404,
                 data: []
             }],
         }
         axios.post.mockResolvedValue(response);
 
         const result = await GameService.joinGame('555555');
         expect(result).toEqual(undefined);
    });
    });
 });