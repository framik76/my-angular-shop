import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ProductState } from '../store/reducers/products.reducer';
import { addProduct, addProductError, addProductSuccess } from '../store/actions/cart.action';
import { CartState } from '../store/reducers/cart.reducer';
import * as ProductsActions from "../store/actions/products.action";
import { Cart } from '../models/cart.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  observable: Observable<ProductState>;
  products: Product[];
  cart: Cart;
  error: boolean;
  isLoading: boolean;
  
  constructor (private productStore : Store<{warehouse: ProductState, cart: CartState}>) {
    this.observable = this.productStore.pipe(select('warehouse'));
  }

  ngOnInit(): void {
      this.productStore.pipe(select('cart')).pipe(
        map(cartState => {
          this.cart = cartState.cart;
        })
      ).subscribe();
      this.observable.pipe(
        map(warehouse => {
          this.products = warehouse.products;
          this.error = warehouse.error;
          this.isLoading = warehouse.isLoading;
        })
      ).subscribe();
      this.productStore.dispatch(ProductsActions.beginGetProducts());
  }

  onAddToCart (product: Product) {
    this.productStore.dispatch(addProduct({ cart: this.cart, product }));    
  }

}
