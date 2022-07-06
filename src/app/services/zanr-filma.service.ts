import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ZANR_FILMA_URL } from '../app.constants';
import { ZanrFilma } from '../models/zanr-filma';

@Injectable({
  providedIn: 'root'
})
export class ZanrFilmaService {

  constructor(private httpClient: HttpClient) { }

  public getAllZanroviFilma(): Observable<any> {
    return this.httpClient.get(`${ZANR_FILMA_URL}`);
  }
  public addZanrFilma(zanrFilma: ZanrFilma): Observable<any> {
    return this.httpClient.post(`${ZANR_FILMA_URL}`, zanrFilma);
  }
  public updateZanrFilma(zanrFilma: ZanrFilma): Observable<any> {
    return this.httpClient.put(`${ZANR_FILMA_URL}`, zanrFilma);
  }
  public deleteZanrFilma(filmID: Guid, zanrID: Guid): Observable<any> {
    console.log(`${ZANR_FILMA_URL}/${filmID}/${zanrID}`);
    return this.httpClient.delete(`${ZANR_FILMA_URL}/${filmID}/${zanrID}`);
  }
}