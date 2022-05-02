import {User} from "../../../../models/user";

export interface LoginInterface {
    email: string,
    password: string
}

export interface LoginResponse {
    token: string,
    user: User
}
