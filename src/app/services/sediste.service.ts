import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { SEDISTE_URL } from '../app.constants';
import { Sediste } from '../models/sediste';

@Injectable({
  providedIn: 'root'
})
export class SedisteService {

  constructor(private httpClient: HttpClient) { }

  
  public getAllSedista(): Observable<any> {
    return this.httpClient.get(`${SEDISTE_URL}`);
  }
  public addSediste(sediste: Sediste): Observable<any> {
    return this.httpClient.post(`${SEDISTE_URL}`, sediste);
  }
  public updateSediste(sediste: Sediste): Observable<any> {
    return this.httpClient.put(`${SEDISTE_URL}`, sediste);
  }
  public deleteSediste(sedisteID: Guid): Observable<any> {
    return this.httpClient.delete(`${SEDISTE_URL}/${sedisteID}`);
  }
}
