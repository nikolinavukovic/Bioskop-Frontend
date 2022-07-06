import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { FILM_URL } from '../app.constants';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private httpClient: HttpClient) { }

  public getAllFilmovi(): Observable<any> {
    return this.httpClient.get(`${FILM_URL}`);
  }
  public addFilm(film: Film): Observable<any> {
    return this.httpClient.post(`${FILM_URL}`, film);
  }
  public updateFilm(film: Film): Observable<any> {
    return this.httpClient.put(`${FILM_URL}`, film);
  }
  public deleteFilm(filmID: Guid): Observable<any> {
    return this.httpClient.delete(`${FILM_URL}/${filmID}`);
  }
}
