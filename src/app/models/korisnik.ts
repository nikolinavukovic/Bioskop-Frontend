import { Guid } from "guid-typescript";
import { TipKorisnika } from "./tip-korisnika";

export class Korisnik {
    korisnikID: Guid;
    ime: string;
    prezime: string;
    telefon: string;
    email: string;
    korisnickoIme: string;
    lozinka: string;
    tipKorisnika: TipKorisnika;
    tipKorisnikaID: Guid;
}