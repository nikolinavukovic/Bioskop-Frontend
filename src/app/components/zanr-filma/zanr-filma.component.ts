import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Film } from 'src/app/models/film';
import { Zanr } from 'src/app/models/zanr';
import { ZanrFilma } from 'src/app/models/zanr-filma';
import { ZanrFilmaService } from 'src/app/services/zanr-filma.service';
import { ZanrFilmaDialogComponent } from '../dialogs/zanr-filma-dialog/zanr-filma-dialog.component';

@Component({
  selector: 'app-zanr-filma',
  templateUrl: './zanr-filma.component.html',
  styleUrls: ['./zanr-filma.component.css']
})
export class ZanrFilmaComponent implements OnInit, OnDestroy {

  displayedColumns = ['film', 'zanr', 'actions'];
  dataSource: MatTableDataSource<ZanrFilma> //odakle dobijam podatke iz htmla
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  private userSub: Subscription;
  isAuthenticated = false;
  role: string;

  constructor(private zanrFilmaService: ZanrFilmaService,
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
    this.subscription = this.zanrFilmaService.getAllZanroviFilma()
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


  public openDialog(flag: string, filmID?: Guid, zanrID?: Guid, film?: Film, zanr?: Zanr) {
    const dialogRef = this.dialog.open(ZanrFilmaDialogComponent, { data: { filmID, zanrID, film, zanr } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 1) {//ako je potvrdno zatvoren dialog
          this.loadData();
        }
      })
  }
}

