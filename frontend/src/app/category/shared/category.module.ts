import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CategoryReadComponent } from '../category-read/category-read.component';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryUpdateComponent } from '../category-update/category-update.component';
import { CategoryService } from './category.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    providers:    [ CategoryService ],
    declarations: [CategoryReadComponent, CategoryCreateComponent, CategoryUpdateComponent],
    exports: []
})
export class CategoryModule { }