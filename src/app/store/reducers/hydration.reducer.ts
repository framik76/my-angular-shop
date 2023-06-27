import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { CartState } from "./cart.reducer";

export const hydrationMetaReducer = (
  reducer: ActionReducer<CartState>
): ActionReducer<CartState> => {
  return (state, action) => {
    console.log(action.type)
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};
