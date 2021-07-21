import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
    templateUrl: "productTable.component.html"
})
export class ProductTableComponent {

    constructor(private repository: ProductRepository) { }

    getProducts(): Product[] {
        return this.repository.getProducts(0);
    }

    deleteProduct(id: number) {
        this.repository.deleteProduct(id);
    }
}