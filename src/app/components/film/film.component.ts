import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { map, take } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/auth/auth.service';
import { HasRoleGuard } from 'src/app/auth/has-role.guard';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';
import { FilmDialogComponent } from '../dialogs/film-dialog/film-dialog.component';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit, OnDestroy {

  displayedColumns = ['naziv', 'trajanje', 'reziser', 'originalniNaziv', 'drzava', 'opis', 'godina', 'actions'];
  dataSource: MatTableDataSource<Film> //odakle dobijam podatke iz htmla
  subscription: Subscription;

  private userSub: Subscription;
  isAuthenticated = false;
  role: string;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private filmService: FilmService,
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
    this.userSub.unsubscribe();
  }

  public loadData() {
    this.subscription = this.filmService.getAllFilmovi()
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

  public openDialog(flag: string, filmID?: Guid, naziv?: string, trajanje?: number, reziser?: string, originalniNaziv?: string, drzava?: string,
    opis?: string, godina?: number) {
    const dialogRef = this.dialog.open(FilmDialogComponent, { data: { filmID, naziv, trajanje, reziser, originalniNaziv, drzava, opis, godina } });
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
