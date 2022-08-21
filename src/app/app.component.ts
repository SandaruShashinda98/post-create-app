import { AuthServiceService } from './auth/auth-service.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'postCreateApp';
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private AuthService: AuthServiceService) {}

  ngOnInit() {
    this.AuthService.autoAuthUser();
    this.userIsAuthenticated = this.AuthService.getIsAuth();
    console.log(this.userIsAuthenticated)
    this.authListenerSubs = this.AuthService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        console.log(this.userIsAuthenticated)
      });
  }

  onClickLogout() {
    this.AuthService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
