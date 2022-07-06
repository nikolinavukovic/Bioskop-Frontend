import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TipKorisnika } from 'src/app/models/tip-korisnika';
import { TipKorisnikaService } from 'src/app/services/tip-korisnika.service';
import { TipKorisnikaDialogComponent } from '../dialogs/tip-korisnika-dialog/tip-korisnika-dialog.component';

@Component({
  selector: 'app-tip-korisnika',
  templateUrl: './tip-korisnika.component.html',
  styleUrls: ['./tip-korisnika.component.css']
})
export class TipKorisnikaComponent implements OnInit, OnDestroy {

  displayedColumns = ['tipKorisnikaID', 'naziv', 'actions'];
  dataSource: MatTableDataSource<TipKorisnika> //odakle dobijam podatke iz htmla
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  private userSub: Subscription;
  isAuthenticated = false;
  role: string;

  constructor(private tipKorisnikaService: TipKorisnikaService,
    public dialog: MatDialog,
    public authService: AuthService) { }

  ngOnInit(): void {

    //provera role
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true; //!!user
    });

    if (this.isAuthenticated) {
      this.role = this.authService.user.value.role.role;
      console.log(this.role);
    }
    else {
      this.role = "";
    }

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData() {
    this.subscription = this.tipKorisnikaService.getAllTipoviKorisnika()
      .subscribe(data => {
        //console.log(data);
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
      }
  }

  public openDialog(flag: string, tipKorisnikaID?: Guid, naziv?: string) {
    const dialogRef = this.dialog.open(TipKorisnikaDialogComponent, { data: { tipKorisnikaID, naziv } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 1) {//ako je potvrdno zatvoren dialog
          this.loadData();
        }
      })
  }
}
