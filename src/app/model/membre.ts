import {User} from "./user";
import {Labo} from "./labo";

export class Membre extends User {
    id: number;
    budget: number;
    labo:Labo;
}
