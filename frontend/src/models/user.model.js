import authService from "../services/auth.service";

const ADMIN = "ADMIN";
const FACULTY = "FACULTY";

export class User {
    constructor(email, firstname, lastname, role, token){
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.token = token;
    }

    isAdmin() {
        return (authService.currentUser().role === ADMIN);
    }

    isFaculty() {
        return (authService.currentUser().role === FACULTY);
    }
}


