import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sediste } from 'src/app/models/sediste';
import { SedisteService } from 'src/app/services/sediste.service';

@Component({
  selector: 'app-sediste-dialog',
  templateUrl: './sediste-dialog.component.html',
  styleUrls: ['./sediste-dialog.component.css']
})
export class SedisteDialogComponent implements OnInit {

  public flag: string;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Sediste>,
    @Inject (MAT_DIALOG_DATA) public data: Sediste,
    public sedisteService: SedisteService) { }

  ngOnInit(): void {
  }


  public add() : void {
    console.log(this.data);
    this.sedisteService.addSediste(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Sedište uspešno dodato.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja sedišta.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }

  public update(): void {
    console.log(this.data);

    this.sedisteService.updateSediste(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno modifikovano sedište.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene sedišta.', 'Zatvori', {
        duration: 2500
      })     
    }
  }

  public delete(): void {
    console.log(this.data);

    this.sedisteService.deleteSediste(this.data.sedisteID).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno obrisano sedište', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja sedišta.', 'Zatvori', {
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
