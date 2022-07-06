import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs/internal/Observable';
import { KUPOVINA_URL } from '../app.constants';
import { Kupovina } from '../models/kupovina';

@Injectable({
  providedIn: 'root'
})
export class KupovinaService {

  constructor(private httpClient: HttpClient) { }

  public getAllKupovine(): Observable<any> {
    return this.httpClient.get(`${KUPOVINA_URL}`);
  }
  public addKupovina(kupovina: Kupovina): Observable<any> {
    return this.httpClient.post(`${KUPOVINA_URL}`, kupovina);
  }
  public updateKupovina(kupovina: Kupovina): Observable<any> {
    return this.httpClient.put(`${KUPOVINA_URL}`, kupovina);
  }
  public deleteKupovina(kupovinaID: Guid): Observable<any> {
    return this.httpClient.delete(`${KUPOVINA_URL}/${kupovinaID}`);
  }

  public getKupovineByKorisnickoIme(korisnickoIme: string): Observable<any>{
    let h = new HttpParams();
    h = h.set('korisnickoIme', korisnickoIme);
    return this.httpClient.get(`${KUPOVINA_URL}`, {params: h});
  }

}