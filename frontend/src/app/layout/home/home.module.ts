import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HomeComponent } from "./home.component";
import { MessageModule } from "../../messages/message.module";
import { MessageComponent } from "../../messages/message.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    imports: [BrowserModule, MessageModule,
              BrowserAnimationsModule],
    declarations: [HomeComponent],
    providers: [],
    bootstrap: [HomeComponent]
})
export class AppModule { }
