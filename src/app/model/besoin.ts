import {Membre} from "./membre";

export class Besoin {
    id: number;
    type: string;
    montant:number;
    description:string;
    status:string;
    membre:Membre;
}
