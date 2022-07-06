import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { SEDISTE_PROJEKCIJE_URL } from '../app.constants';
import { SedisteProjekcije } from '../models/sediste-projekcije';


@Injectable({
  providedIn: 'root'
})
export class SedisteProjekcijeService {


  constructor(private httpClient: HttpClient) { }

  public getAllSedistaProjekcije(): Observable<any> { //nece mi nikad trebati
    return this.httpClient.get(`${SEDISTE_PROJEKCIJE_URL}`);
  }

  public addSedisteProjekcije(sedisteProjekcije: SedisteProjekcije): Observable<any> {
    return this.httpClient.post(`${SEDISTE_PROJEKCIJE_URL}`, sedisteProjekcije);
  }
  public updateSedisteProjekcije(sedisteProjekcije: SedisteProjekcije): Observable<any> {
    return this.httpClient.put(`${SEDISTE_PROJEKCIJE_URL}`, sedisteProjekcije);
  }
  public deleteSedisteProjekcije(sedisteID: Guid, projekcijaID: Guid): Observable<any> {
    console.log(`${SEDISTE_PROJEKCIJE_URL}/${sedisteID}/${projekcijaID}`);
    return this.httpClient.delete(`${SEDISTE_PROJEKCIJE_URL}/${sedisteID}/${projekcijaID}`);
  }

  public getSedistaProjekcijeZaKupovinu(kupovinaID: Guid): Observable<any>{
    let h = new HttpParams();
    h = h.set('kupovinaID', kupovinaID.toString()); 
    return this.httpClient.get(`${SEDISTE_PROJEKCIJE_URL}`, {params: h});
  }

  public getSedistaProjekcijeZaProjekciju(projekcijaID: Guid): Observable<any>{
    let h = new HttpParams();
    h = h.set('projekcijaID', projekcijaID.toString()); 
    return this.httpClient.get(`${SEDISTE_PROJEKCIJE_URL}`, {params: h});
  }

  public getSedisteProjekcijeById(sedisteID: Guid, projekcijaID: Guid){
    return this.httpClient.get(`${SEDISTE_PROJEKCIJE_URL}/${sedisteID}/${projekcijaID}`);
  }


  
}