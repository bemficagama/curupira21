import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "../../account/shared/account.service";

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  isLogged : boolean = false

  constructor(private auth: AccountService, private router: Router) { }

  ngOnInit() {
    this.isLogged = this.auth.isUserLoggedIn()
  }

  logout() {
    this.auth.clear();
    this.router.navigateByUrl("/login");
    this.isLogged = false
  }
}
