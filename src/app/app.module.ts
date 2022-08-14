import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmComponent } from './components/film/film.component';
import { TipKorisnikaComponent } from './components/tip-korisnika/tip-korisnika.component';
import { ZanrComponent } from './components/zanr/zanr.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { KorisnikComponent } from './components/korisnik/korisnik.component';
import { FilmDialogComponent } from './components/dialogs/film-dialog/film-dialog.component';
import { ZanrDialogComponent } from './components/dialogs/zanr-dialog/zanr-dialog.component';
import { TipKorisnikaDialogComponent } from './components/dialogs/tip-korisnika-dialog/tip-korisnika-dialog.component';
import { MatOptionModule } from '@angular/material/core';
import { SedisteDialogComponent } from './components/dialogs/sediste-dialog/sediste-dialog.component';
import { SedisteComponent } from './components/sediste/sediste.component';
import { ProjekcijaComponent } from './components/projekcija/projekcija.component';
import { ProjekcijaDialogComponent } from './components/dialogs/projekcija-dialog/projekcija-dialog.component';
import { KorisnikDialogComponent } from './components/dialogs/korisnik-dialog/korisnik-dialog.component';
import { ZanrFilmaComponent } from './components/zanr-filma/zanr-filma.component';
import { ZanrFilmaDialogComponent } from './components/dialogs/zanr-filma-dialog/zanr-filma-dialog.component';
import { KupovinaComponent } from './components/kupovina/kupovina.component';
import { KupovinaDialogComponent } from './components/dialogs/kupovina-dialog/kupovina-dialog.component';
import { SedisteProjekcijeDialogComponent } from './components/dialogs/sediste-projekcije-dialog/sediste-projekcije-dialog.component';
import { SedisteProjekcijeComponent } from './components/sediste-projekcije/sediste-projekcije.component';
import { SedisteProjekcijeZaProjekcijuComponent } from './components/sediste-projekcije-za-projekciju/sediste-projekcije-za-projekciju.component';
import { MatSortModule } from '@angular/material/sort';
import { SubmitDialogComponent } from './components/dialogs/submit-dialog/submit-dialog.component';
import { TicketSuccessComponent } from './components/stripe/ticket-success/ticket-success.component';
import { TicketFailureComponent } from './components/stripe/ticket-failure/ticket-failure.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmComponent,
    TipKorisnikaComponent,
    ZanrComponent,
    AuthComponent,
    KorisnikComponent,
    FilmDialogComponent,
    ZanrDialogComponent,
    TipKorisnikaDialogComponent,
    SedisteDialogComponent,
    SedisteComponent,
    ProjekcijaComponent,
    ProjekcijaDialogComponent,
    KorisnikDialogComponent,
    ZanrFilmaComponent,
    ZanrFilmaDialogComponent,
    KupovinaComponent,
    KupovinaDialogComponent,
    SedisteProjekcijeDialogComponent,
    SedisteProjekcijeComponent,
    SedisteProjekcijeZaProjekcijuComponent,
    SubmitDialogComponent,
    TicketSuccessComponent,
    TicketFailureComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule, 
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule, 
    MatSnackBarModule,
    MatOptionModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule
      ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
