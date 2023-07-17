import { Product } from "src/app/models/product.model";
//import * as data from '../../../assets/data.json';
import * as ProductActions from '../actions/products.action';
import { Action, createReducer, on } from "@ngrx/store";

export type ProductState = {
    products: Product[],
    error: boolean,
    isLoading: boolean
}

//const products : any = (data as any).default.products;  
  
export const initialState: ProductState = {
    products: [],
    error: false,
    isLoading: false
};

const _productsReducer = createReducer(initialState,
    on(ProductActions.beginGetProducts, state => {
        return {
            ...state,
            isLoading: true,
            error: false
        };
    }),
    on(ProductActions.successGetProducts, (state, {results}) => {
        return {
            ...state,
            products: results,
            error: false,
            isLoading: false
        };
    }),
    on(ProductActions.errorGetProducts, (state, {error: Error}) => {
        return {
            ...state,
            error: true,
            isLoading: false            
        };
    })    
);

export function productsReducer(state : ProductState | undefined, action: Action) {
    return _productsReducer(state, action)
}

