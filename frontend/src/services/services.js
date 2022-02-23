import axios from 'axios';

// does this have to be the port the backend runs on?
const API_URL = 'http://localhost:3000/api/auth'

class GameService {

    joinGame(gameCode) {
        return axios.post(API_URL + 'joinGame', {
            gameCode
        })
        .then(response => {
            if (response.data) {
                localStorage.setItem('gameObject', JSON.stringify(response.data)); 
            }
            return response.data;
        });

    
    }
    
    clearGame() {
        localStorage.removeItem('gameCode');
    }
}

export default new GameService();