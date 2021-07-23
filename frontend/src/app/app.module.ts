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
import { KeyComponent } from './key/key.component';
import { UrlComponent } from './url/url.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { CategoryRepository } from "./model/category.repository";
//import { RestDataSource } from "./model/rest.datasource";
import { HttpErrorHandler } from "./http-error-handler.service";
import { MessageService } from "./message.service";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CategoryReadComponent, 
    KeyComponent, UrlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MessageService, HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
