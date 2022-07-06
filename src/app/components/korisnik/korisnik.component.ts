import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Korisnik } from 'src/app/models/korisnik';
import { TipKorisnika } from 'src/app/models/tip-korisnika';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { KorisnikDialogComponent } from '../dialogs/korisnik-dialog/korisnik-dialog.component';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit, OnDestroy {

  displayedColumns = ['ime', 'prezime', 'telefon', 'email', 'korisnickoIme', 'tipKorisnika', 'actions'];
  dataSource: MatTableDataSource<Korisnik> //odakle dobijam podatke iz htmla
  subscription: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  private username: string;
  public role: string;

  constructor(private korisnikService: KorisnikService,
    public dialog: MatDialog,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData() {

    this.username = this.authService.user.value.role.unique_name;
    this.role = this.authService.user.value.role.role;
    console.log(this.username + ', ' + this.role);

    if (this.role == 'Admin' || this.role == 'Zaposleni') {
      this.subscription = this.korisnikService.getAllKorisnici()
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }),
        (error: Error) => {
          console.log(error.name + ' ' + error.message);
        }
    }
    else if (this.role == 'Registrovani korisnik') {
      this.subscription = this.korisnikService.getKorisnikByKorisnickoIme(this.username)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }),
        (error: Error) => {
          console.log(error.name + ' ' + error.message);
        }
    }

  }

  public openDialog(flag: string, korisnikID?: Guid, ime?: string, prezime?: string, telefon?: string, email?: string, korisnickoIme?: string, lozinka?: string, tipKorisnika?: TipKorisnika) {
    const dialogRef = this.dialog.open(KorisnikDialogComponent, { data: { korisnikID, ime, prezime, telefon, email, korisnickoIme, lozinka, tipKorisnika } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 1) {//ako je potvrdno zatvoren dialog
          this.loadData();
        }
      })
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
