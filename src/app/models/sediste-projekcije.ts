import { Guid } from "guid-typescript";
import { Film } from "./film";
import { Kupovina } from "./kupovina";
import { Projekcija } from "./projekcija";
import { Sediste } from "./sediste";


export class SedisteProjekcije {
    sedisteID: Guid;
    projekcijaID: Guid;
    cena: number;
    kupovinaID: Guid;
    sediste: Sediste;
    projekcija: Projekcija;
    kupovina: Kupovina;
}