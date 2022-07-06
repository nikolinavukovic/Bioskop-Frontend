import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/models/film';
import { Projekcija } from 'src/app/models/projekcija';
import { FilmService } from 'src/app/services/film.service';
import { ProjekcijaService } from 'src/app/services/projekcija.service';

@Component({
  selector: 'app-projekcija-dialog',
  templateUrl: './projekcija-dialog.component.html',
  styleUrls: ['./projekcija-dialog.component.css']
})
export class ProjekcijaDialogComponent implements OnInit {

  public flag: string;
  filmovi: Film[];
  filmSubscription: Subscription;
  

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Projekcija>,
    @Inject (MAT_DIALOG_DATA) public data: Projekcija,
    public projekcijaService: ProjekcijaService,
    public filmService: FilmService) { }

  ngOnInit(): void {
    this.filmSubscription = this.filmService.getAllFilmovi()
    .subscribe(filmovi => {
      this.filmovi = filmovi.data
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }


  public add() : void {
    this.data.filmID = this.data.film.filmID;
    console.log(this.data);
    this.projekcijaService.addProjekcija(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Projekcija uspešno dodata.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja projekcije.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }

  public update(): void {
    console.log(this.data);
    this.data.filmID = this.data.film.filmID;
    this.projekcijaService.updateProjekcija(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno modifikovana projekcija.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene projekcije.', 'Zatvori', {
        duration: 2500
      })     
    }
  }

  public delete(): void {
    console.log(this.data);
    this.data.filmID = this.data.film.filmID;
    this.projekcijaService.deleteProjekcija(this.data.projekcijaID).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno obrisana projekcija', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja projekcije.', 'Zatvori', {
        duration: 2500
      })      
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
  }
    compareTo(a: Film, b: Film) {
      return a.filmID == b.filmID;
    }
  
    ngOnDestroy(): void {
      this.filmSubscription.unsubscribe();
    }
  
  }