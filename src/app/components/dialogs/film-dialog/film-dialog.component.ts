import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-film-dialog',
  templateUrl: './film-dialog.component.html',
  styleUrls: ['./film-dialog.component.css']
})
export class FilmDialogComponent implements OnInit {

  public flag: string;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<Film>,
              @Inject (MAT_DIALOG_DATA) public data: Film,
              public filmService: FilmService)  { }

  ngOnInit(): void {
  }

  public add() : void {
    console.log(this.data);
    this.filmService.addFilm(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Film uspešno dodat.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja filma.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }

  public update(): void {
    this.filmService.updateFilm(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno modifikovan film: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene filma.', 'Zatvori', {
        duration: 2500
      })     
    }
  }

  public delete(): void {
    console.log(this.data.filmID);
    this.filmService.deleteFilm(this.data.filmID).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno obrisan film: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja filma.', 'Zatvori', {
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

}