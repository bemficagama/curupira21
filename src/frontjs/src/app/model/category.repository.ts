import { Injectable } from "@angular/core";
import { Category } from "./category.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class CategoryRepository {
    private categories: Category[] = [];

    constructor(private dataSource: RestDataSource) {
        dataSource.getCategories().subscribe(data => {
            this.categories = data;
        });
    }

    getCategories(): Category[] {
        return this.categories;
    }

    getCategory(id: number): Category {
        return this.categories.find(c => c.id == id)!;
    }

    saveCategory(category: Category) {
        
    }
    
    deleteCategory(id: number) {
        
    }
}
