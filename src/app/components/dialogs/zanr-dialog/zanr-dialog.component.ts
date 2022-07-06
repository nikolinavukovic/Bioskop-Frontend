import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Zanr } from 'src/app/models/zanr';
import { ZanrService } from 'src/app/services/zanr.service';

@Component({
  selector: 'app-zanr-dialog',
  templateUrl: './zanr-dialog.component.html',
  styleUrls: ['./zanr-dialog.component.css']
})
export class ZanrDialogComponent implements OnInit {

  public flag: string;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Zanr>,
    @Inject (MAT_DIALOG_DATA) public data: Zanr,
    public zanrService: ZanrService) { }

  ngOnInit(): void {
  }

  public add() : void {
    console.log(this.data);
    this.zanrService.addZanr(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Žanr uspešno dodat.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja žanra.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }

  public update(): void {
    console.log(this.data);

    this.zanrService.updateZanr(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno modifikovan žanr: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene žanra.', 'Zatvori', {
        duration: 2500
      })     
    }
  }

  public delete(): void {
    console.log(this.data);

    this.zanrService.deleteZanr(this.data.zanrID).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno obrisan žanr: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja žanra.', 'Zatvori', {
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
