export type UserId = string;
export interface User {
    id: UserId;
    name: string;
    picture: string;
}
export interface ClientUser {
    jwt: string;
    userData: User;
}
