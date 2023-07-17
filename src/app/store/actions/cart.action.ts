import { createAction, props } from "@ngrx/store";
import { Cart, CartProduct } from "src/app/models/cart.model";
import { Product } from "src/app/models/product.model";

export const CART_ACTION = {
    ADD_START: '[CART] START ADD PRODUCT',
    ADD_SUCCESS: '[CART] SUCCESS ADD PRODUCT',
    ADD_ERROR: '[CART] ERROR ADD PRODUCT',
    REMOVE_START: '[CART] START REMOVE PRODUCT',
    REMOVE_SUCCESS: '[CART] SUCCESS REMOVE PRODUCT',
    REMOVE_ERROR: '[CART] ERROR REMOVE PRODUCT'    
}

export const addProduct = createAction(CART_ACTION.ADD_START,
    props<{cart: Cart, product : Product}>()
);

export const addProductSuccess = createAction(
    CART_ACTION.ADD_SUCCESS,
    props<{result: Cart}>()
);

export const addProductError = createAction(
    CART_ACTION.ADD_ERROR,
    props<{error: Error}>()
);

export const removeProduct = createAction(CART_ACTION.REMOVE_START,
    props<{name : string}>()
);

export const removeProductSuccess = createAction(
    CART_ACTION.REMOVE_SUCCESS,
    props<{name: string}>()    
);

export const removeProductError = createAction(
    CART_ACTION.REMOVE_ERROR,
    props<{error: Error}>()    
);