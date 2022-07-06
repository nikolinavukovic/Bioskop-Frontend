import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Film } from 'src/app/models/film';
import { Projekcija } from 'src/app/models/projekcija';
import { ProjekcijaService } from 'src/app/services/projekcija.service';
import { ProjekcijaDialogComponent } from '../dialogs/projekcija-dialog/projekcija-dialog.component';

@Component({
  selector: 'app-projekcija',
  templateUrl: './projekcija.component.html',
  styleUrls: ['./projekcija.component.css']
})
export class ProjekcijaComponent implements OnInit, OnDestroy {

  displayedColumns = ['naziv','vreme','trajanje', 'godina', 'actions'];
  dataSource : MatTableDataSource<Projekcija> //odakle dobijam podatke iz htmla
  subscription: Subscription;
  selektovanaProjekcija: Projekcija;

  isAuthenticated = false;
  role: string;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private projekcijaService: ProjekcijaService,
    public dialog: MatDialog,
    public authService: AuthService) { }
    

  ngOnInit(): void {

        //provera role
        this.authService.user.subscribe(user => {
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

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  public loadData(){
    this.subscription = this.projekcijaService.getAllProjekcije()
      .subscribe(data => {
        console.log(data.data)
        this.dataSource = new MatTableDataSource(data.data);     
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
      }
  }


  public openDialog(flag: string, projekcijaID?: Guid, vreme?: Date, brojStampanihKarata?: number, film?: Film) {
    const dialogRef = this.dialog.open(ProjekcijaDialogComponent, { data: { projekcijaID, vreme, brojStampanihKarata, film } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 1) {//ako je potvrdno zatvoren dialog
          this.loadData();
        }
      })
  }

  selectRow(row: any) {
    console.log(row);
    this.selektovanaProjekcija = row;
  }

}

