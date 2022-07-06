import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/models/film';
import { Kupovina } from 'src/app/models/kupovina';
import { Projekcija } from 'src/app/models/projekcija';
import { Sediste } from 'src/app/models/sediste';
import { SedisteProjekcije } from 'src/app/models/sediste-projekcije';
import { SedisteProjekcijeService } from 'src/app/services/sediste-projekcije.service';
import { SedisteProjekcijeDialogComponent } from '../dialogs/sediste-projekcije-dialog/sediste-projekcije-dialog.component';

@Component({
  selector: 'app-sediste-projekcije',
  templateUrl: './sediste-projekcije.component.html',
  styleUrls: ['./sediste-projekcije.component.css']
})
export class SedisteProjekcijeComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns = ['sediste', 'film', 'projekcija', 'cena'];
  dataSource : MatTableDataSource<SedisteProjekcije> //odakle dobijam podatke iz htmla
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Input() selektovanaKupovina: Kupovina; //dekorator za child komponentu


  constructor(private sedisteProjekcijeService: SedisteProjekcijeService,
    public dialog: MatDialog) { }

    ngOnChanges(): void {
      console.log("Selektovana kupovina: " + this.selektovanaKupovina.kupovinaID);

      if(this.selektovanaKupovina.kupovinaID) {
        this.loadData();
    }
  }

  ngOnInit(): void {
   // this.loadData();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  public loadData(){

    this.subscription = this.sedisteProjekcijeService.getSedistaProjekcijeZaKupovinu(this.selektovanaKupovina.kupovinaID)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(data);
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
      }
  }


}

