import { Cart, CartProduct } from "src/app/models/cart.model";
import * as CartActions from '../actions/cart.action';
import { createReducer, on, Action } from "@ngrx/store";

export interface CartState {
    cart: Cart;
    isLoading: boolean,
    error: string | null
    
}

export const initialState: CartState = {
    cart: {
        products: [],
        total: 0
    },
    isLoading: false,
    error: null
}

const _cartReducer = createReducer(initialState,
    on(CartActions.addProduct, (state, { product }) => {
        return {
            ...state,
            cart: state.cart,
            isLoading: true,
            error: null
        }
    }),
    on(CartActions.addProductError, (state, { error }) => {
        return {
            ...state,
            cart: state.cart,
            isLoading: false,
            error: error
        }
    }),
    on(CartActions.addProductSuccess, (state, { product }) => {
        const newProducts = state.cart.products.map(item => ({...item}));
        const findIndex =  state.cart.products.findIndex(item => item.id === product.id);
        if (findIndex !== -1) {
            newProducts[findIndex].quantity += 1;
        } else {
            const toAdd: CartProduct = {
                id: product.id,
                name: product.name,
                imageSrc: product.imageSrc,
                price: product.price,
                quantity: 1
            };
            newProducts.push(toAdd);
        }
        return {
            ...state,
            cart: {
                total: state.cart.total + product.price,
                products: newProducts
            },
            isLoading: false,
            error: ''  
        };
    }),
    on(CartActions.removeProduct, (state) => {
        return {
            ...state,
            cart: state.cart,
            isLoading: true,
            error: null
        }
    }),
    on(CartActions.removeProductError, (state, { error }) => {
        return {
            ...state,
            cart: state.cart,
            isLoading: false,
            error: error
        }
    }),
    on(CartActions.removeProductSuccess, (state, { name }) => {
        let newProducts = state.cart.products.map(item => ({...item}));
        const findIndex =  state.cart.products.findIndex(item => item.name === name);
        let price = 0;
        if (findIndex !== -1) {
            price = newProducts[findIndex].price;
            const quantity = newProducts[findIndex].quantity;
            if (quantity === 1) {
                newProducts = newProducts.filter(item => item.name !== name);
            } else if (quantity > 1) {
                newProducts[findIndex].quantity -= 1;
            }
            
        } 
        return {
            ...state,
            cart: {
                total: state.cart.total - price,
                products: newProducts
            },
            isLoading: false,
            error: ''  
        };
    })
);

export function cartReducer(state: CartState | undefined, action: Action) {
    return _cartReducer(state, action);
}