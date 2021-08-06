import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KeyReadComponent } from '../key-read/key-read.component';
import { KeyCreateComponent } from '../key-create/key-create.component';
import { KeyUpdateComponent } from '../key-update/key-update.component';
import { KeyService } from './key.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    providers:    [ KeyService ],
    declarations: [KeyReadComponent, KeyCreateComponent, KeyUpdateComponent],
    exports: []
})
export class KeyModule { }