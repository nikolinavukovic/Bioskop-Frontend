import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { KORISNIK_URL, LOGIN_URL } from "src/app/app.constants";
import { Role } from "./role.model";
import { User } from "./user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null!);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {

    }

    signup(ime: string, prezime: string, telefon: string, email: string, korisnickoIme: string, lozinka: string) {

        console.log(ime, prezime, telefon, email, korisnickoIme, lozinka);

        return this.http.post(KORISNIK_URL,
            {
                ime: ime,
                prezime: prezime,
                email: email,
                lozinka: lozinka,
                korisnickoIme: korisnickoIme,
                telefon: telefon,
                tipKorisnikaId: 'bc679089-e19f-43e4-946f-651ffbdb2afb'
            }).pipe(catchError(this.handleError));

    }

    autoLogin() {
        const userData: {
            _token: string;
        } = JSON.parse(localStorage.getItem('userData')!);

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData._token);


        if (loadedUser.token) {
            loadedUser.role = this.getUserRole(loadedUser.token);
            this.user.next(loadedUser);
            this.autoLogout(7200000);
        }


    }

    login(username: string, password: string) {
        return this.http.post<string>(LOGIN_URL,
            {
                korisnickoIme: username,
                lozinka: password
            }).pipe(catchError(this.handleError), tap(resData => { //tap koristi ali ne menja ni na koji nacin
                const user = new User(resData);
                user.role = this.getUserRole(user.token);
                this.user.next(user);
                this.autoLogout(7200000); //2 sata
                localStorage.setItem('userData', JSON.stringify(user));
            }));
    }

    public getUserRole(token: string): Role {
        return JSON.parse(atob(token.split('.')[1])) as Role;
    }


    logout() {
        this.user.next(null!);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {

        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    private handleError(errorRes: HttpErrorResponse) {
        let e = new Error();

        let errorMessage = 'Dogodila se greška. Pokušajte ponovo!';

        if (!errorRes.error) {
            e.message = errorMessage;
            return throwError(() => e.message);

        }

        console.log(errorRes);
        switch (errorRes.status) {
            case 401:
            case 400:
            case 405:
                e.message = errorRes.error;
        }

        return throwError(() => e.message);

    }


}