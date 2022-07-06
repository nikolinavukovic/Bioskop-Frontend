import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Korisnik } from 'src/app/models/korisnik';
import { Kupovina } from 'src/app/models/kupovina';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { KupovinaService } from 'src/app/services/kupovina.service';
import { KupovinaDialogComponent } from '../dialogs/kupovina-dialog/kupovina-dialog.component';

@Component({
  selector: 'app-kupovina',
  templateUrl: './kupovina.component.html',
  styleUrls: ['./kupovina.component.css']
})
export class KupovinaComponent implements OnInit, OnDestroy {

  displayedColumns = ['ukupanIznos', 'placeno', 'vremeRezervacije', 'vremePlacanja', 'korisnik'];
  dataSource: MatTableDataSource<Kupovina> //odakle dobijam podatke iz htmla
  subscription: Subscription;
  selektovanaKupovina: Kupovina;

  public role: string;
  public username: string;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private kupovinaService: KupovinaService,
    public dialog: MatDialog,
    public authService: AuthService,
    public korisnikService: KorisnikService,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData() {

    this.role = this.authService.user.value.role.role;
    this.username = this.authService.user.value.role.unique_name;

    if (this.role == 'Admin' || this.role == 'Zaposleni') {
      this.subscription = this.kupovinaService.getAllKupovine()
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(data.data);
          
        }),
        (error: Error) => {
          console.log(error.name + ' ' + error.message)
        }
    }


    else if (this.role == 'Registrovani korisnik') {
      this.subscription = this.kupovinaService.getKupovineByKorisnickoIme(this.username)
        .subscribe(data => {
          console.log(data);
          if (data !=null){
            this.dataSource = new MatTableDataSource(data.data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
          else {
            this.snackBar.open('Nemate nijednu kupovinu!', 'Zatvori', {
              duration: 2500
            });

          }
          
        }),
        (error: Error) => {
          console.log(error.name + ' ' + error.message)
        }
    }

  }



  selectRow(row: any) {
    console.log(row);
    this.selektovanaKupovina = row;
  }
}


