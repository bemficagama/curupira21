import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: '',
    password: ''
  }

  public errorMessage: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  authenticate(form: NgForm) {
    if (form.valid) {
        this.accountService.login(this.login)
            .subscribe(response => {
              console.log(Object.keys(response).length)
              this.router.navigate([''])
            })
    } else {
        this.errorMessage = "Form Data Invalid";
    }
}
}
