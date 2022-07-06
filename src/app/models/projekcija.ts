import { Guid } from "guid-typescript";
import { jsonIgnore } from "json-ignore";
import { Film } from "./film";

export class Projekcija {
    projekcijaID: Guid;
    vreme: Date;
    brojStampanihKarata: number;
    //@jsonIgnore()
    film: Film;
    filmID: Guid;
}