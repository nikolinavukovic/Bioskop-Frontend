import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Observable, of, Subscription } from 'rxjs';
import { FAILURE_URL, SUCCESS_URL } from 'src/app/app.constants';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Price } from 'src/app/models/price';
import { Projekcija } from 'src/app/models/projekcija';
import { SedisteProjekcije } from 'src/app/models/sediste-projekcije';
import { ISession, ITicket } from 'src/app/models/ticket';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { SedisteProjekcijeService } from 'src/app/services/sediste-projekcije.service';
import { SubmitDialogComponent } from '../dialogs/submit-dialog/submit-dialog.component';

declare const Stripe: any;

@Component({
  selector: 'app-sediste-projekcije-za-projekciju',
  templateUrl: './sediste-projekcije-za-projekciju.component.html',
  styleUrls: ['./sediste-projekcije-za-projekciju.component.css']
})
export class SedisteProjekcijeZaProjekcijuComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns = ['sediste', 'projekcija', 'cena', 'kupovina', 'projekcijaID','actions'];
  dataSource: MatTableDataSource<SedisteProjekcije> //odakle dobijam podatke iz htmla
  subscription: Subscription;
  public selektovanoSedisteProjekcije: SedisteProjekcije;
  selection = new SelectionModel<SedisteProjekcije>(true, []);
  selected: SedisteProjekcije[];
  korisnikId: Guid;

  @Input() selektovanaProjekcija: Projekcija; //dekorator za child komponentu
  //@Input() authService: AuthService;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private sedisteProjekcijeService: SedisteProjekcijeService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private korisnikService: KorisnikService,
    public httpClient: HttpClient,
    public authService: AuthService) { }

  ngOnChanges(): void {
    if (this.selektovanaProjekcija.projekcijaID) {
      this.loadData();
    }
  }

  ngOnInit(): void {
    this.loadData();

    let username = this.authService.user.value.role.unique_name;
    console.log(username);

      this.korisnikService.getAllKorisnici().subscribe(korisnici => {

        for (let korisnik of korisnici.data) {
          if (korisnik.korisnickoIme == username) {
            this.korisnikId = korisnik.korisnikID;
            console.log(this.korisnikId)

          }

        }
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData() {

    this.subscription = this.sedisteProjekcijeService.getSedistaProjekcijeZaProjekciju(this.selektovanaProjekcija.projekcijaID)
      .subscribe(data => {

        if (data != null) {

          let arr: any[] = [];
          data.data.forEach((element: any) => {
            if (element.kupovina.kupovinaID == 'def3dc42-3395-4d59-b48b-7aa35a726a25') { //provera da li je dostupno sediste
              console.log(element.kupovina.kupovinaID.toString());
              arr.push(element);
            }
          });

          if (arr.length > 0) {
            this.dataSource = new MatTableDataSource(arr);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
          else {
            this.snackBar.open('Nema dostupnih sedišta za ovu projekciju!', 'Zatvori', {
              duration: 2500
            });

          }
        }
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
      }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  submit(){
    console.log('potvrdjeno');
    this.selected = [];
    this.dataSource.data.forEach(row => {
      if(this.selection.isSelected(row) == true) {
        this.selected.push(row);
      }
    }
      );

      this.selected.forEach(element => {
        element.sedisteID = element.sediste.sedisteID;
        element.projekcijaID = element.projekcija.projekcijaID;
        element.kupovinaID = element.kupovina.kupovinaID;
      });

  }


  requestTicketSession(price: Price): void { //api call
    console.log(price.cena);
    //console.log(price.sedistaProjekcije[0].sediste.sedisteID);

    this.httpClient
      .post<ISession>( "https://localhost:5001/api/payments/create-checkout-session" , { cena: price.cena, projekcijaId: price.projekcijaId, korisnikId: price.korisnikId, kupovinaId: price.kupovinaId, 
      //sedistaProjekcije: price.sedistaProjekcije, 
      sedistaId: price.sedistaId, 
      successUrl: SUCCESS_URL, failureUrl: FAILURE_URL })
      .subscribe(session => {
        this.redirectToCheckOut(session);
        //ovde ima one urlove u tutorijalu
      })
  }


   redirectToCheckOut(session: ISession) { //redirektujemo do stripe checkout
    const stripe = Stripe(session.publicKey);

    stripe.redirectToCheckout({

      sessionId: session.sessionId,

    });

  }


  public add(): void {
    let ukupnaCena: number = 0;

    this.selected.forEach(element => {
      ukupnaCena = ukupnaCena + element.cena;
    });

    let price: Price = new Price;
    price.cena = ukupnaCena;
    //price.sedistaProjekcije = this.selected;
    price.projekcijaId = this.selected[0].projekcija.projekcijaID; 
    price.korisnikId = this.korisnikId;
    price.successUrl = SUCCESS_URL; //promeni
    price.failureUrl = FAILURE_URL;
    

    for(let i = 0; i < this.selected.length; i++){
      price.sedistaId[i] = this.selected[i].sediste.sedisteID.toString();
    }


    price.sedistaId.forEach(element => {
      console.log(element);
    });

    this.requestTicketSession(price);

  }

}
