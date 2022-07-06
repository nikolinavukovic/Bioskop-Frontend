import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Korisnik } from 'src/app/models/korisnik';
import { TipKorisnika } from 'src/app/models/tip-korisnika';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { TipKorisnikaService } from 'src/app/services/tip-korisnika.service';

@Component({
  selector: 'app-korisnik-dialog',
  templateUrl: './korisnik-dialog.component.html',
  styleUrls: ['./korisnik-dialog.component.css']
})
export class KorisnikDialogComponent implements OnInit {

  public flag: string;
  tipoviKorisnika: TipKorisnika[];
  tipKorisnikaSubscription: Subscription;
  public role: string;

  
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Korisnik>,
    @Inject (MAT_DIALOG_DATA) public data: Korisnik,
    public tipKorisnikaService: TipKorisnikaService,
    public korisnikService: KorisnikService,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this.role = this.authService.user.value.role.role;
    this.data.tipKorisnika;
    this.tipKorisnikaSubscription = this.tipKorisnikaService.getAllTipoviKorisnika()
    .subscribe(tipoviKorisnika => {
      this.tipoviKorisnika = tipoviKorisnika.data
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  public add() : void {
    this.data.tipKorisnikaID = this.data.tipKorisnika.tipKorisnikaID;
    console.log(this.data);
    this.korisnikService.addKorisnik(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Korisnik uspešno dodat.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja korisnika.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }

  public update(): void {
    console.log(this.data);
    this.data.tipKorisnikaID = this.data.tipKorisnika.tipKorisnikaID;
    this.korisnikService.updateKorisnik(this.data).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno modifikovan korisnik.', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene korisnika.', 'Zatvori', {
        duration: 2500
      })     
    }
  }

  public delete(): void {
    console.log(this.data);
    this.data.tipKorisnikaID = this.data.tipKorisnika.tipKorisnikaID;
    this.korisnikService.deleteKorisnik(this.data.korisnikID).subscribe(() => {
      console.log(this.data);
      this.snackBar.open('Uspešno obrisan korisnik', 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja korisnika.', 'Zatvori', {
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
    compareTo(a: TipKorisnika, b: TipKorisnika) {
      return a.tipKorisnikaID == b.tipKorisnikaID;
    }
  
    ngOnDestroy(): void {
      this.tipKorisnikaSubscription.unsubscribe();
    }
  
  }