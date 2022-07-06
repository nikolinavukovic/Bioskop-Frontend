import { Guid } from "guid-typescript";
import { SedisteProjekcije } from "./sediste-projekcije";

export class Price {
    cena: number;
    //sedistaProjekcije: SedisteProjekcije[];
    sedistaId: string[] = [];
    //projekcijeId: Guid[] = [];
    kupovinaId: Guid;
    korisnikId: Guid;
    projekcijaId: Guid
    successUrl : string;
    failureUrl: string;
}