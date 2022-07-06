import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/models/film';
import { Zanr } from 'src/app/models/zanr';
import { ZanrFilma } from 'src/app/models/zanr-filma';
import { FilmService } from 'src/app/services/film.service';
import { ZanrFilmaService } from 'src/app/services/zanr-filma.service';
import { ZanrService } from 'src/app/services/zanr.service';

@Component({
  selector: 'app-zanr-filma-dialog',
  templateUrl: './zanr-filma-dialog.component.html',
  styleUrls: ['./zanr-filma-dialog.component.css']
})
export class ZanrFilmaDialogComponent implements OnInit {

  public flag: string;
  filmovi: Film[];
  filmSubscription: Subscription;
  zanrovi: Zanr[];
  zanrSubscription: Subscription;
  

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ZanrFilma>,
    @Inject (MAT_DIALOG_DATA) public data: ZanrFilma,
    public zanrFilmaService: ZanrFilmaService,
    public filmService: FilmService,
    public zanrService: ZanrService) { }

  ngOnInit(): void {
    this.filmSubscription = this.filmService.getAllFilmovi()
    .subscribe(filmovi => {
      this.filmovi = filmovi.data
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }

    this.zanrSubscription = this.zanrService.getAllZanrovi()
    .subscribe(zanrovi => {
      this.zanrovi = zanrovi.data
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
    
  }


  public add() : void {
    this.data.filmID = this.data.film.filmID;
    this.data.zanrID = this.data.zanr.zanrID;

    console.log(this.data);

    this.zanrFilmaService.addZanrFilma(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Žanr filma uspešno dodat.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja žanra filma.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }

  // public update(): void {
  //   this.data.filmID = this.data.film.filmID;
  //   this.data.zanrID = this.data.zanr.zanrID;
  //   console.log(this.data);

  //   this.zanrFilmaService.updateZanrFilma(this.data).subscribe(() => {
  //     console.log(this.data);
  //     this.snackBar.open('Uspešno modifikovan žanr filma.', 'OK', {
  //       duration: 2500
  //     })
  //   }),
  //   (error:Error) => {
  //     console.log(error.name + ' ' + error.message);
  //     this.snackBar.open('Došlo je do greške prilikom izmene žanra filma.', 'Zatvori', {
  //       duration: 2500
  //     })     
  //   }
  // }

  public delete(): void {
    console.log(this.data);
    this.data.filmID = this.data.film.filmID;
    this.data.zanrID = this.data.zanr.zanrID;
    this.zanrFilmaService.deleteZanrFilma(this.data.filmID, this.data.zanrID).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno obrisan žanr filma', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja žanra filma.', 'Zatvori', {
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
    compareToF(a: Film, b: Film) {
      return a.filmID == b.filmID;
    }

    compareToZ(a: Zanr, b: Zanr) {
      return a.zanrID == b.zanrID;
    }
  
    ngOnDestroy(): void {
      this.filmSubscription.unsubscribe();
      this.zanrSubscription.unsubscribe();
    }
  
  }