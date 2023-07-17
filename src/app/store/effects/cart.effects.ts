import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import * as CartActions from '../actions/cart.action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Product} from '../../models/product.model';
import { Cart, CartProduct } from 'src/app/models/cart.model';

@Injectable()
export class CartEffects {
  constructor(private http: HttpClient, private actions: Actions) {}

  private ENDPOINT = 'http://localhost:3000/cart';

  addToCart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(CartActions.addProduct),
      mergeMap(action => {
        const product = JSON.parse(JSON.stringify(action.product));
        const cart = JSON.parse(JSON.stringify(action.cart));
        const cartProduct = {
            id: product.id,
            name: product.name,
            quantity: 1,
            imageSrc: product.imageSrc,
            price: product.price
        }
        const findIndex = cart.products.findIndex((item: any) => item.id === product.id);
        if (findIndex !== -1) {
          cart.products[findIndex].quantity += 1;
        } else {
          cart.products.push(cartProduct);
        }
        cart.total += cartProduct.price
        return this.http.post(this.ENDPOINT, JSON.stringify(cart), 
        {"headers": {'Content-Type': 'application/json'}}).pipe(            
          map((result: any) => {
            console.log(result);
            return CartActions.addProductSuccess({ result });
          }),
          catchError((error: Error) => {
            return of(CartActions.addProductError({ error }));
          })
        );
      })
    );
  });

  /* removeFromCart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(CartActions.removeProduct),
      mergeMap(action => {
        const productName = action.name;
        return this.http.delete(this.ENDPOINT + '?name=' + productName,  
        {"headers": {'Content-Type': 'application/json'}}).pipe(            
          map((result: any) => {
            console.log(result);
            return CartActions.removeProductSuccess({ result });
          }),
          catchError((error: Error) => {
            return of(CartActions.removeProductError({ error }));
          })
        );
      })
    );
  }); */

}