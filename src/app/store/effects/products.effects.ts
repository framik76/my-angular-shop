import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import * as ProductActions from '../actions/products.action';
import {Product} from '../../models/product.model';

@Injectable()
export class ProductsEffects {
  constructor(private http: HttpClient, private actions: Actions) {}

  private ENDPOINT = 'http://localhost:3000/products';

  getProducts: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(ProductActions.beginGetProducts),
      mergeMap(action => {
        return this.http.get(this.ENDPOINT).pipe(            
          map((data: any) => {
            console.log(data);
            return ProductActions.successGetProducts({ results: data });
          }),
          catchError((error: Error) => {
            return of(ProductActions.errorGetProducts({ error }));
          })
        );
      })
    );
  });
}