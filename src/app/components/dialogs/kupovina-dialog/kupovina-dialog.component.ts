import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Korisnik } from 'src/app/models/korisnik';
import { Kupovina } from 'src/app/models/kupovina';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { KupovinaService } from 'src/app/services/kupovina.service';

@Component({
  selector: 'app-kupovina-dialog',
  templateUrl: './kupovina-dialog.component.html',
  styleUrls: ['./kupovina-dialog.component.css']
})
export class KupovinaDialogComponent implements OnInit {

  public flag: string;
  korisnici: Korisnik[];
  korisnikSubscription: Subscription;
  

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Kupovina>,
    @Inject (MAT_DIALOG_DATA) public data: Kupovina,
    public kupovinaService: KupovinaService,
    public korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnikSubscription = this.korisnikService.getAllKorisnici()
    .subscribe(korisnici => {
      this.korisnici = korisnici.data
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }

    
  }


  public add() : void {
    this.data.korisnikID = this.data.korisnik.korisnikID;
    console.log(this.data);
    this.kupovinaService.addKupovina(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Kupovina uspešno dodata.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja kupovine.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }

  public update(): void {
    console.log(    this.data.placeno );
    console.log(this.data);
    this.data.korisnikID = this.data.korisnik.korisnikID;
    this.kupovinaService.updateKupovina(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno modifikovana kupovina.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene kupovine.', 'Zatvori', {
        duration: 2500
      })     
    }
  }

  public delete(): void {
    console.log(this.data);
    this.data.korisnikID = this.data.korisnik.korisnikID;
    this.kupovinaService.deleteKupovina(this.data.kupovinaID).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno obrisana kupovina', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja kupovine.', 'Zatvori', {
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
    compareTo(a: Korisnik, b: Korisnik) {
      return a.korisnikID == b.korisnikID;
    }
  
    ngOnDestroy(): void {
      this.korisnikSubscription.unsubscribe();
    }
  
  }