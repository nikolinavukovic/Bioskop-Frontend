import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HasRoleGuard } from './auth/has-role.guard';
import { FilmComponent } from './components/film/film.component';
import { KorisnikComponent } from './components/korisnik/korisnik.component';
import { KupovinaComponent } from './components/kupovina/kupovina.component';
import { ProjekcijaComponent } from './components/projekcija/projekcija.component';
import { SedisteProjekcijeComponent } from './components/sediste-projekcije/sediste-projekcije.component';
import { SedisteComponent } from './components/sediste/sediste.component';
import { TicketFailureComponent } from './components/stripe/ticket-failure/ticket-failure.component';
import { TicketSuccessComponent } from './components/stripe/ticket-success/ticket-success.component';
import { TipKorisnikaComponent } from './components/tip-korisnika/tip-korisnika.component';
import { ZanrFilmaComponent } from './components/zanr-filma/zanr-filma.component';
import { ZanrComponent } from './components/zanr/zanr.component';
import { TipKorisnika } from './models/tip-korisnika';

const routes: Routes = [
  { path: 'film', component: FilmComponent},
  { path: 'projekcija', component: ProjekcijaComponent},
  { path: 'sediste', component: SedisteComponent},
  { path: 'tip-korisnika', component: TipKorisnikaComponent},
  { path: 'korisnik', component: KorisnikComponent, canActivate: [AuthGuard, HasRoleGuard], data: {role: ['Admin', 'Zaposleni', 'Registrovani korisnik']}},
  { path: 'zanr', component: ZanrComponent, canActivate: [AuthGuard, HasRoleGuard], data: {role: ['Admin', 'Zaposleni']}},
  { path: 'zanr-filma', component: ZanrFilmaComponent, canActivate: [AuthGuard, HasRoleGuard], data: {role: ['Admin', 'Zaposleni']}},
  { path: 'kupovina', component: KupovinaComponent, canActivate: [AuthGuard, HasRoleGuard], data: {role: ['Admin', 'Zaposleni', 'Registrovani korisnik']}},
  { path: 'sediste-projekcije', component: SedisteProjekcijeComponent, canActivate: [AuthGuard, HasRoleGuard], data: {role: ['Admin', 'Zaposleni']}},

  { path: 'success', component: TicketSuccessComponent },
  { path: 'failure', component: TicketFailureComponent },
  { path: 'auth', component: AuthComponent},
  { path: '', redirectTo: 'film', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
