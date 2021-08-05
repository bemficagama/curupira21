import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HomeComponent } from "./home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    imports: [BrowserModule,
              BrowserAnimationsModule],
    declarations: [HomeComponent],
    providers: [],
    bootstrap: [HomeComponent]
})
export class AppModule { }
