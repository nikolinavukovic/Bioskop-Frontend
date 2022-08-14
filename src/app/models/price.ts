import { Guid } from "guid-typescript";
import { SedisteProjekcije } from "./sediste-projekcije";

export class Price {
    cena: number;
    sedistaId: string[] = [];
    kupovinaId: Guid;
    korisnikId: Guid;
    projekcijaId: Guid
    successUrl : string;
    failureUrl: string;
}