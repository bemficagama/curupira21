import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UrlReadComponent } from '../url-read/url-read.component';
import { UrlCreateComponent } from '../url-create/url-create.component';
import { UrlUpdateComponent } from '../url-update/url-update.component';
import { UrlService } from './url.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    providers:    [ UrlService ],
    declarations: [UrlReadComponent, UrlCreateComponent, UrlUpdateComponent],
    exports: []
})
export class UrlModule { }