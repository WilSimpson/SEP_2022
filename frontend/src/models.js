import authService from "./services/auth.service";

const ADMIN = "ADMIN";
const FACULTY = "FACULTY";

class User {
    constructor(email, firstname, lastname, role, token){
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.token = token;
    }
}

function isAdmin() {
    return (authService.getCurrentUser().role === ADMIN);
}

function isFaculty() {
    return (authService.getCurrentUser().role === FACULTY);
}

export {
    User, isAdmin, isFaculty
}
