import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { Category } from "../model/category.model";
import { ProductRepository } from "../model/product.repository";
import { CategoryRepository } from "../model/category.repository";
import { Cart } from "../model/cart.model";
import { Router } from "@angular/router";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent {
    public selectedCategory: number = 0;
    public productsPerPage = 4;
    public selectedPage = 1;

    constructor(private repository: ProductRepository,
        private repositoryCategory: CategoryRepository,
        private cart: Cart,
        private router: Router) { }

    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage
        return this.repository.getProducts(this.selectedCategory)
            .slice(pageIndex, pageIndex + this.productsPerPage);
    }

    get categories(): Category[] {
        return this.repositoryCategory.getCategories();
    }

    changeCategory(newCategory: number) {
        this.selectedCategory = newCategory;
        console.log(newCategory)
    }

    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    changePageSize(newSize: number) {
        this.productsPerPage = Number(newSize);
        this.changePage(1);
    }

    get pageCount(): number {
        return Math.ceil(this.repository
            .getProducts(this.selectedCategory).length / this.productsPerPage)
    }

    addProductToCart(product: Product) {
        this.cart.addLine(product);
        this.router.navigateByUrl("/cart");
    }

    onChangeSize($event: any) {
        const size: number = $event.value
        this.changePageSize(size)
    }
}
