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
                     data: [{"1": {'text': "You are a software engineer doing stuff with cars. Make Choices.",
                     'options': [{'text': "Ignore Result", 'link': "1A"},
                               {'text': "Technician Re-test", 'link': "2A"},
                               {'text': "Engineer Re-test", 'link': "5A"},
                               {'text': "Inform Manager", 'link': "4A"},
                               {'text': "Email CEO", 'link': "3A"}],
                   'password': "psw",
                   'only_chance': false},
             "1A": {'text': "You ignored the result. Real professional.",
                    'options': [{'text': "Ignore Crash", 'link': "6A"},
                              {'text': "Inform Manager", 'link': "7A"},
                              {'text': "Email CEO", 'link': "8A"}
                        ],
                    'password': "psw",
                    'only_chance': false},
             "2A": {'text': "Fine. He'll do it again...",
                    'options': [],
                    'password': "psw",
                    'only_chance': false,
                    'chance_string': "coin"},
             "3A": {'text': "Bold Move. The CEO is listening.",
                    'options': [],
                    'password': "psw",
                    'only_chance': false},
             "4A": {'text': "You told the manager. He said 'shhh'.",
                    'options': [],
                    'password': "psw",
                    'only_chance': false},
             "5A": {'text': "Better have an engineer do it.",
                    'options': [],
                    'password': "psw",
                    'only_chance': false},
             "6A": {'text': "Really? You're ignoring this again!?",
                    'options': [{'text': "Email CEO", 'link': "3B"},
                              {'text': "Keep Quiet", 'link': "5C"},],
                    'password': "psw",
                    'only_chance': false},
             "8A": {'text': "You have told the CEO.",
                    'options': [{'text': "Write objective report", 'link': "3C"},
                              {'text': "Write report with spin", 'link': "5B"},],
                    'password': "psw",
                    'only_chance': false},
             "7A": {'text': "You informed the manager.",
                    'options': [{'text': "Ignore it", 'link': "6A"},
                              {'text': "Investigate", 'link': "4B"},],
                    'password': "psw",
                    'only_chance': false},
             "3C": {'text': "So, you were honest.",
                    'options': [],
                    'password': "psw",
                    'only_chance': false},
             "5B": {'text': "You little liar.",
                    'options': [],
                    'password': "psw",
                    'only_chance': false},
             "5C": {'text': "You kept your mouth shut.",
                    'options': [],
                    'password': "psw",
                    'only_chance': false},
             "5C": {'text': "You really tattled to the CEO.",
                    'options': [],
                    'password': "psw",
                    'only_chance': false},
             "6C": {'text': "You kept the part number. If it ain't broke don't fix it, and if it is, still don't",
                    'options': [{'text': "Keep Quiet", 'link': "5C"},
                              {'text': "Email CEO", 'link': "3B"}],
                    'password': "psw",
                    'only_chance': false},
             "2B": {'text': "Yasss organized queen, change that part number.",
                    'options': [{'text': "Keep Quiet", 'link': "5E"},
                              {'text': "Email CEO", 'link': "8C"}],
                    'password': "psw",
                    'only_chance': false},
             "2B": {'text': "A snitch, really. This late in the game? The CEO is confused.",
                    'options': [{'text': "Write objective report", 'link': "3C"},
                              {'text': "Write report with spin", 'link': "5B"}],
                    'password': "psw",
                    'only_chance': false}}]
                 }],
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