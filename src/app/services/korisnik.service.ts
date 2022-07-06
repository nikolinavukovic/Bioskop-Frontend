import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { KORISNIK_URL } from '../app.constants';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private httpClient: HttpClient) { }

  public getAllKorisnici(): Observable<any> {
    return this.httpClient.get(`${KORISNIK_URL}`);
  }
  public addKorisnik(korisnik: Korisnik): Observable<any> {
    return this.httpClient.post(`${KORISNIK_URL}`, korisnik);
  }
  public updateKorisnik(korisnik: Korisnik): Observable<any> {
    return this.httpClient.put(`${KORISNIK_URL}`, korisnik);
  }
  public deleteKorisnik(korisnikID: Guid): Observable<any> {
    return this.httpClient.delete(`${KORISNIK_URL}/${korisnikID}`);
  }

  public getKorisnikByKorisnickoIme(korisnickoIme: string): Observable<any>{
    let h = new HttpParams();
    h = h.set('korisnickoIme', korisnickoIme);
    return this.httpClient.get(`${KORISNIK_URL}`, {params: h});
  }

}
