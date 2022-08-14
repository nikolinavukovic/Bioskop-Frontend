import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/models/film';
import { Kupovina } from 'src/app/models/kupovina';
import { Projekcija } from 'src/app/models/projekcija';
import { Sediste } from 'src/app/models/sediste';
import { SedisteProjekcije } from 'src/app/models/sediste-projekcije';
import { FilmService } from 'src/app/services/film.service';
import { KupovinaService } from 'src/app/services/kupovina.service';
import { ProjekcijaService } from 'src/app/services/projekcija.service';
import { SedisteProjekcijeService } from 'src/app/services/sediste-projekcije.service';
import { SedisteService } from 'src/app/services/sediste.service';

@Component({
  selector: 'app-sediste-projekcije-dialog',
  templateUrl: './sediste-projekcije-dialog.component.html',
  styleUrls: ['./sediste-projekcije-dialog.component.css']
})
export class SedisteProjekcijeDialogComponent implements OnInit {

  public flag: string;
  sedista: Sediste[];
  sedisteSubscription: Subscription;
  projekcije: Projekcija[];
  projekcijaSubscription: Subscription;
  kupovine: Kupovina[];
  kupovinaSubscription: Subscription;
  filmovi: Film[];
  filmoviSubscription: Subscription;


  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SedisteProjekcije>,
    @Inject(MAT_DIALOG_DATA) public data: SedisteProjekcije,
    public sedisteProjekcijeService: SedisteProjekcijeService,
    public sedisteService: SedisteService,
    public projekcijaService: ProjekcijaService,
    public kupovinaService: KupovinaService,
    public filmService: FilmService) { }

  ngOnInit(): void {
    this.sedisteSubscription = this.sedisteService.getAllSedista()
      .subscribe(sedista => {
        this.sedista = sedista.data
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }

    this.projekcijaSubscription = this.projekcijaService.getAllProjekcije()
      .subscribe(projekcije => {
        this.projekcije = projekcije.data
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }

      this.kupovinaSubscription = this.kupovinaService.getAllKupovine()
      .subscribe(kupovine => {
        this.kupovine = kupovine.data
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }

      this.filmoviSubscription = this.filmService.getAllFilmovi()
      .subscribe(filmovi => {
        this.filmovi = filmovi.data
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }



  }


  public add(): void {
    this.data.sedisteID = this.data.sediste.sedisteID;
    this.data.projekcijaID = this.data.projekcija.projekcijaID;
    this.data.kupovinaID = this.data.kupovina.kupovinaID;


    console.log(this.data);

    this.sedisteProjekcijeService.addSedisteProjekcije(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Sedište projekcije uspešno dodato.', 'OK', {
        duration: 2500
      })
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Došlo je do greške prilikom dodavanja sedišta projekcije.', 'Zatvori', {
          duration: 2500
        })

      }
  }

  public update(): void {
    this.data.sedisteID = this.data.sediste.sedisteID;
    this.data.projekcijaID = this.data.projekcija.projekcijaID;
    this.data.kupovinaID = this.data.kupovina.kupovinaID;

    console.log(this.data);

    this.sedisteProjekcijeService.updateSedisteProjekcije(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno modifikovano sedište projekcije.', 'OK', {
        duration: 2500
      })
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Došlo je do greške prilikom izmene sedišta projekcije.', 'Zatvori', {
          duration: 2500
        })
      }
  }

  public delete(): void {
    console.log(this.data);
    this.data.sedisteID = this.data.sediste.sedisteID;
    this.data.projekcijaID = this.data.projekcija.projekcijaID;
    this.data.kupovinaID = this.data.kupovina.kupovinaID;


    this.sedisteProjekcijeService.deleteSedisteProjekcije(this.data.sedisteID, this.data.projekcijaID).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno obrisano sedište projekcije', 'OK', {
        duration: 2500
      })
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Došlo je do greške prilikom brisanja sedišta projekcije.', 'Zatvori', {
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
  compareToS(a: Sediste, b: Sediste) {
    return a.sedisteID == b.sedisteID;
  }

  compareToP(a: Projekcija, b: Projekcija) {
    return a.projekcijaID == b.projekcijaID;
  }

  compareToK(a: Kupovina, b: Kupovina) {
    return a.kupovinaID == b.kupovinaID;
  }

  ngOnDestroy(): void {
    this.sedisteSubscription.unsubscribe();
    this.kupovinaSubscription.unsubscribe();
    this.projekcijaSubscription.unsubscribe();
  }

}