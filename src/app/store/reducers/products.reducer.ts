import { Product } from "src/app/models/product.model";
import * as data from '../../../assets/data.json';
import { Action, createReducer } from "@ngrx/store";

export interface ProductState {
    products: Product[];
}

const products : any = (data as any).default.products;  
  
export const initialState: Product[] = products;

const _productsReducer = createReducer(initialState);

export function productsReducer(state : Product[] | undefined, action: Action) {
    return _productsReducer(state, action)
}

