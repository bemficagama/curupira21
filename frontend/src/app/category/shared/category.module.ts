import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CategoryReadComponent } from '../category-read/category-read.component';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryUpdateComponent } from '../category-update/category-update.component';
import { CategoryService } from './category.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, NgbModule],
    //imports: [ FormsModule, RouterModule, NgbModule],
    providers:    [ CategoryService ],
    declarations: [CategoryReadComponent, CategoryCreateComponent, CategoryUpdateComponent],
    exports: []
})
export class CategoryModule { }
