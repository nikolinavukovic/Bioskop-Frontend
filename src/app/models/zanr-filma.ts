import { Guid } from "guid-typescript";
import { Film } from "./film";
import { Zanr } from "./zanr";

export class ZanrFilma {
    film: Film;
    zanr: Zanr;
    filmID: Guid;
    zanrID: Guid;
}