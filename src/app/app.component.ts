import { Component, DoCheck, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//@Injectable()
//@Directive()
export class AppComponent implements DoCheck {


  title = 'fca-frontend';
  isMenuRequired = false;
  isAdminUser = false;

  constructor(private router: Router, private service: AuthService) {

  }

  ngDoCheck(): void {
    let currentUrl = this.router.url;

    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }

    if (this.service.GetUserRole() === 'admin') {
      this.isAdminUser = true;
    } else {
      this.isAdminUser = false;
    }
  }
}
