export default class Game {
    constructor(id, creatorID, active, startQuestionID) {
        this.id = id;
        this.creatorID = creatorID;
        this.active = active;
        this.startQuestionID = startQuestionID;
    }

    status() {
        return this.active ? "active" : "inactive";
    }
}