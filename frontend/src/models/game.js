import FormatDate from "../helpers/DateFormatter";

export default class Game {
    constructor(id, name, creatorID, active, startQuestionID, createdAt) {
        this.id = id;
        this.name = name;
        this.creatorID = creatorID;
        this.active = active;
        this.startQuestionID = startQuestionID;
        this.createdAt = createdAt;
    }

    status() {
        return this.active ? "active" : "inactive";
    }

    formatCreatedAt() {
        return FormatDate(this.createdAt)
    }

    asOption() {
        return {label: this.name, id: this.id}
    }
}