import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { TIP_KORISNIKA_URL } from '../app.constants';
import { AuthService } from '../auth/auth.service';
import { TipKorisnika } from '../models/tip-korisnika';

@Injectable({
  providedIn: 'root'
})
export class TipKorisnikaService {

  constructor(private httpClient: HttpClient) { }

  public getAllTipoviKorisnika(): Observable<any> {
    return this.httpClient.get(`${TIP_KORISNIKA_URL}`);
  }
  public addTipKorisnika(tipKorisnika: TipKorisnika): Observable<any> {
    return this.httpClient.post(`${TIP_KORISNIKA_URL}`, tipKorisnika);
  }
  public updateTipKorisnika(tipKorisnika: TipKorisnika): Observable<any> {
    return this.httpClient.put(`${TIP_KORISNIKA_URL}`, tipKorisnika);
  }
  public deleteTipKorisnika(tipKorisnikaID: Guid): Observable<any> {
    return this.httpClient.delete(`${TIP_KORISNIKA_URL}/${tipKorisnikaID}`);
  }
}
