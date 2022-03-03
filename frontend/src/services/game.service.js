import axios from "axios";
import { Games } from "../helpers/DummyData";
import Game from "../models/game";
import configureStore from "../store/store";

const {persistor, store, API_URL} = configureStore();

class GameService {
    constructor() {
        this.games = []
        for (let i=0; i<Games.length; i++) {
            this.games[i] = Object.assign(new Game(), Games[i])
        }
    }

    getGames() {
        const games = []
        axios.get(API_URL + '/api/games')
            .then((response) => {
                if (response.status == 200) {
                    games = response.data
                } else if(response.status == 404) {
                    games = this.games
                } else {
                    
                }
            })
        return games
    }

    // @TODO(Wil): Replace with API call
    getGame(id) {
        if (id >= this.games.length) {
            return null
        }
        return this.games[id]
    }

    createGame(name, json) {
        console.log('game created')
    }

    updateGame(id, name, json, active) {
        console.log('game updated')
    }
}

export default new GameService();