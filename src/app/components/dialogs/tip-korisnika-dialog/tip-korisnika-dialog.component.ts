import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipKorisnika } from 'src/app/models/tip-korisnika';
import { TipKorisnikaService } from 'src/app/services/tip-korisnika.service';

@Component({
  selector: 'app-tip-korisnika-dialog',
  templateUrl: './tip-korisnika-dialog.component.html',
  styleUrls: ['./tip-korisnika-dialog.component.css']
})
export class TipKorisnikaDialogComponent implements OnInit {

  public flag: string;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TipKorisnika>,
    @Inject (MAT_DIALOG_DATA) public data: TipKorisnika,
    public tipKorisnikaService: TipKorisnikaService) { }

  ngOnInit(): void {
  }

  public add() : void {
    console.log(this.data);
    this.tipKorisnikaService.addTipKorisnika(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Tip korisnika uspešno dodat.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja tipa korisnika.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }

  public update(): void {
    this.tipKorisnikaService.updateTipKorisnika(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno modifikovan tip korisnika: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene tipa korisnika.', 'Zatvori', {
        duration: 2500
      })     
    }
  }

  public delete(): void {
    this.tipKorisnikaService.deleteTipKorisnika(this.data.tipKorisnikaID).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno obrisan tip korisnika: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja tipa korisnika.', 'Zatvori', {
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