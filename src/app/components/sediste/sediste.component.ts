import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Sediste } from 'src/app/models/sediste';
import { SedisteService } from 'src/app/services/sediste.service';
import { SedisteDialogComponent } from '../dialogs/sediste-dialog/sediste-dialog.component';

@Component({
  selector: 'app-sediste',
  templateUrl: './sediste.component.html',
  styleUrls: ['./sediste.component.css']
})
export class SedisteComponent implements OnInit, OnDestroy {

  displayedColumns = ['sedisteID', 'brojReda', 'brojSedista', 'actions'];
  dataSource: MatTableDataSource<Sediste> //odakle dobijam podatke iz htmla
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  private userSub: Subscription;
  isAuthenticated = false;
  role: string;

  constructor(private sedisteService: SedisteService,
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
    this.subscription = this.sedisteService.getAllSedista()
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

  public openDialog(flag: string, sedisteID?: Guid, brojReda?: number, brojSedista?: number) {
    const dialogRef = this.dialog.open(SedisteDialogComponent, { data: { sedisteID, brojReda, brojSedista } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 1) {//ako je potvrdno zatvoren dialog
          this.loadData();
        }
      })
  }
}
