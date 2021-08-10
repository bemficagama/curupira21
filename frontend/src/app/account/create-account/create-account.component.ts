import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      this.accountService.register(this.account)
        .subscribe(response => {
          console.log(Object.keys(response).length)
          this.router.navigate(['login'])
        })
    } catch (error) {
      console.log(error)
    }
  }

}
