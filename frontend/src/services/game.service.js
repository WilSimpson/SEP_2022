import { Games } from "../helpers/DummyData";
import Game from "../models/game";
import authService from "./auth.service";



class GameService {

    constructor() {
        this.games = []
        for (let i=0; i<Games.length; i++) {
            this.games[i] = Object.assign(new Game(), Games[i])
        }
    }

    // @TODO(Wil): Replace with API call
    getGames() {
        return this.games
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