import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";
import {Product } from "../model/product.model"

@Component({
    templateUrl: "cartDetail.component.html"
})
export class CartDetailComponent {

    constructor(public cart: Cart) { 

    }

    onChangeQuantity(product: Product, $event: any) {
        const newValue: number = $event.value
        this.cart.updateQuantity(product, newValue)
    }
}
