import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Bioskop-Frontend';
  private userSub: Subscription;
  isAuthenticated = false;

  role: string;

  constructor(private authService: AuthService) {

  }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      if (user == null) {
        this.role = 'Neulogovan';
      } else {
        this.role = user.role.role;
      }
    });

    this.authService.autoLogin();
    
  }


  onLogout() {
    this.authService.logout();   
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
