import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import {
  FooterComponent,
  HeaderComponent,
  //SharedModule
} from './shared';
import { AppRoutingModule } from './app-routing.module';
import { CategoryReadComponent } from './category/category-read/category-read.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { CategoryService } from './category/shared/category.service';
import { KeyComponent } from './key/key.component';
import { UrlComponent } from './url/url.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from "./http-error-handler.service";
import { MessageService } from "./message.service";
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { httpInterceptorProviders } from "./http-interceptors";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CategoryReadComponent, CategoryUpdateComponent,
    KeyComponent, UrlComponent, LoginComponent, CreateAccountComponent, HomeComponent, AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MessageService, HttpErrorHandler, httpInterceptorProviders, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
