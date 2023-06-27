import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductState } from '../store/reducers/products.reducer';
import { addProduct, addProductError, addProductSuccess } from '../store/actions/cart.action';
import { CartState } from '../store/reducers/cart.reducer';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$: Observable<Product[]>;
  cart$: Observable<CartState>;

  constructor (private productStore : Store<{products: Product[]}>,
    private cartStore : Store<{cart : CartState}>) {
    this.products$ = this.productStore.pipe(select('products'));
    this.cart$ = this.cartStore.pipe(select('cart'));
  }

  onAddToCart (product: Product) {
    try {
      this.cartStore.dispatch(addProduct({ product }));
      this.cartStore.dispatch(addProductSuccess({ product }));
    } catch (err) {
      const error = "Error adding to cart";
      this.cartStore.dispatch(addProductError({ error }));
    }
    
  }

}
