import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from "@angular/router";

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
      const result = await this.accountService.createAccount(this.account)
      this.router.navigateByUrl("/login");
    } catch (error) {
      console.log(error)
    }    
  }

}
