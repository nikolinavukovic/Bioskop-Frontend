import { Guid } from "guid-typescript";

export class Film {
    filmID: Guid;
    naziv: string;
    trajanje: number;
    reziser: string;
    originalniNaziv: string;
    drzava: string;
    opis: string;
    godina: number;  
}