import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ZANR_URL } from '../app.constants';
import { Zanr } from '../models/zanr';

@Injectable({
  providedIn: 'root'
})
export class ZanrService {

  constructor(private httpClient: HttpClient) { }

  public getAllZanrovi(): Observable<any> {
    return this.httpClient.get(`${ZANR_URL}`);
  }
  public addZanr(zanr: Zanr): Observable<any> {
    return this.httpClient.post(`${ZANR_URL}`, zanr);
  }
  public updateZanr(zanr: Zanr): Observable<any> {
    return this.httpClient.put(`${ZANR_URL}`, zanr);
  }
  public deleteZanr(zanrID: Guid): Observable<any> {
    return this.httpClient.delete(`${ZANR_URL}/${zanrID}`);
  }

}
