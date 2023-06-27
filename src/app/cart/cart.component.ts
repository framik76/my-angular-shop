import { Component } from '@angular/core';
import { Cart, CartProduct } from '../models/cart.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../store/reducers/cart.reducer';
import { removeProduct, removeProductError, removeProductSuccess } from '../store/actions/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart$: Observable<CartState>;

  constructor(private store : Store<{ cart : CartState}>) {
    this.cart$ = store.pipe(select("cart"));
  }

  getImageSrc(product: CartProduct): string {
    return `assets/${product.imageSrc}`;
  }

  onRemoveItem(product: CartProduct) {
    try {
      this.store.dispatch(removeProduct());
      this.store.dispatch(removeProductSuccess({ name: product.name }));
    } catch (err) {
      const error = "Error removing from cart";
      this.store.dispatch(removeProductError({ error }));
    }

  }
}
