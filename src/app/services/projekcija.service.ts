import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { PROJEKCIJA_URL } from '../app.constants';
import { Projekcija } from '../models/projekcija';

@Injectable({
  providedIn: 'root'
})
export class ProjekcijaService {

  constructor(private httpClient: HttpClient) { }

  public getAllProjekcije(): Observable<any> {
    return this.httpClient.get(`${PROJEKCIJA_URL}`);
  }
  public addProjekcija(projekcija: Projekcija): Observable<any> {
    return this.httpClient.post(`${PROJEKCIJA_URL}`, projekcija);
  }
  public updateProjekcija(projekcija: Projekcija): Observable<any> {
    return this.httpClient.put(`${PROJEKCIJA_URL}`, projekcija);
  }
  public deleteProjekcija(projekcijaID: Guid): Observable<any> {
    return this.httpClient.delete(`${PROJEKCIJA_URL}/${projekcijaID}`);
  }

}
