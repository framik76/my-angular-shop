import { Cart, CartProduct } from "src/app/models/cart.model";
import * as CartActions from '../actions/cart.action';
import { createReducer, on, Action } from "@ngrx/store";
import { Product } from "src/app/models/product.model";

export type CartState = {
    cart: Cart;
    isLoading: boolean,
    error: boolean,
    toAdd: Product | null,
    toRemove: string | null
}

export const initialState: CartState = {
    cart: {
        products: [],
        total: 0
    },
    toAdd: null,
    toRemove: null,
    isLoading: false,
    error: false
}

const _cartReducer = createReducer(initialState,
    on(CartActions.addProduct, (state, payload) => {
        return {
            ...state,
            toAdd: payload.product
        }
    }),
    on(CartActions.addProductError, (state, payload) => {
        return {
            ...state,
            error: true,
            toAdd: null
        }
    }),
    on(CartActions.addProductSuccess, (state, {result}) => {
        return {
            ...state,
            cart: result,
            isLoading: false,
            error: false,
            toAdd: null  
        };
    })
    ,
    on(CartActions.removeProduct, (state, payload) => {
        return {
            ...state,
            toRemove: payload.name
        }
    }),
    on(CartActions.removeProductError, (state, payload) => {
        return {
            ...state,
            error: true,
            toRemove: null
        }
    }),
    on(CartActions.removeProductSuccess, (state, payload) => {
        let newProducts = state.cart.products.map(item => ({...item}));
        const findIndex =  state.cart.products.findIndex(item => item.name === payload.name);
        let price = 0;
        if (findIndex !== -1) {
            price = newProducts[findIndex].price;
            const quantity = newProducts[findIndex].quantity;
            if (quantity === 1) {
                newProducts = newProducts.filter(item => item.name !== payload.name);
            } else if (quantity > 1) {
                newProducts[findIndex].quantity -= 1;
            }
            
        } 
        return {
            ...state,
            cart: {
                ...state.cart,
                total: state.cart.total - price,
                products: newProducts
            },
            isLoading: false,
            error: false,
            toRemove: null  
        };
    })
);

export function cartReducer(state: CartState | undefined, action: Action) {
    return _cartReducer(state, action);
}