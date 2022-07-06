import { Guid } from "guid-typescript";
import { Korisnik } from "./korisnik";
import { SedisteProjekcije } from "./sediste-projekcije";

export class Kupovina{
    kupovinaID: Guid;
    ukupanIznos: number;
    placeno: boolean;
    vremeRezervacije: Date;
    vremePlacanja: Date;
    korisnikID: Guid;
    korisnik: Korisnik;
    sedistaProjekcije: SedisteProjekcije[];
}