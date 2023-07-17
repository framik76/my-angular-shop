import { Component, OnInit } from '@angular/core';
import { Cart, CartProduct } from '../models/cart.model';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CartState } from '../store/reducers/cart.reducer';
import { removeProduct, removeProductError, removeProductSuccess } from '../store/actions/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  observable: Observable<CartState>;
  products: CartProduct[];
  error: boolean;
  total: number;

  constructor(private store : Store<{ cart : CartState}>) {
    this.observable = store.pipe(select("cart"));
    this.products = [];
    this.total = 0;
    this.error = false;
  }

  ngOnInit () {
    this.observable.pipe(
      map(cartState => {
        this.products = cartState.cart.products;
        this.total = cartState.cart.total;
        this.error = cartState.error;
      })
    ).subscribe();
  }

  getImageSrc(product: CartProduct): string {
    return `assets/${product.imageSrc}`;
  }

  onRemoveItem(product: CartProduct) {
    this.store.dispatch(removeProduct({ name: product.name }));
    this.store.dispatch(removeProductSuccess({ name: product.name }));
  }
}
