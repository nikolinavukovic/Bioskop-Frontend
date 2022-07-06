import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Zanr } from 'src/app/models/zanr';
import { ZanrService } from 'src/app/services/zanr.service';
import { ZanrDialogComponent } from '../dialogs/zanr-dialog/zanr-dialog.component';

@Component({
  selector: 'app-zanr',
  templateUrl: './zanr.component.html',
  styleUrls: ['./zanr.component.css']
})
export class ZanrComponent implements OnInit, OnDestroy {

  displayedColumns = ['zanrID', 'naziv', 'actions'];
  dataSource: MatTableDataSource<Zanr> //odakle dobijam podatke iz htmla
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  private userSub: Subscription;
  isAuthenticated = false;
  role: string;

  constructor(private zanrService: ZanrService,
    public dialog: MatDialog,
    private authService: AuthService) { }

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
    this.subscription = this.zanrService.getAllZanrovi()
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

  public openDialog(flag: string, zanrID?: Guid, naziv?: string) {
    const dialogRef = this.dialog.open(ZanrDialogComponent, { data: { zanrID, naziv } });
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
