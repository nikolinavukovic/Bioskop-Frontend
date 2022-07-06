import { Role } from "./role.model";

export class User {

    role: Role;

    constructor(
        private _token: string
    ) { }
    get token() {
        return this._token;
    }
}