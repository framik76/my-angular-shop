import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { CartState, cartReducer } from "./reducers/cart.reducer";
import { hydrationMetaReducer } from "./reducers/hydration.reducer";


  
export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]