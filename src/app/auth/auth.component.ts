import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup = new FormGroup({
    ime: new FormControl(''),
    prezime: new FormControl(''),
    telefon: new FormControl(''),
    email: new FormControl(''),

    username: new FormControl(''),
    password: new FormControl(''),

  });
  isLoginMode = true;
  error: string = null!;


  constructor(private authService: AuthService, public snackBar: MatSnackBar, private router: Router) {

  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: any) {

    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    if (!this.isLoginMode) {

      const ime = form.value.ime;
      const prezime = form.value.prezime;
      const telefon = form.value.telefon;
      const email = form.value.email;

      this.authService.signup(ime, prezime, telefon, email, username, password).subscribe(resData => {
        console.log(resData);
        this.authService.login(username, password).subscribe(resData => {
          console.log(resData);
        });
        this.router.navigate(['/film']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.snackBar.open(this.error, 'Zatvori', {
          duration: 2500
        });
      });

    } else {
      this.authService.login(username, password).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['/film']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.snackBar.open(this.error, 'Zatvori', {
          duration: 2500
        });
      });
    }


    this.isLoginMode = true; //dodala kasnije 
    form.reset();
  }

  @Output() submitEM = new EventEmitter();

  ngOnInit(): void {
  }

}
