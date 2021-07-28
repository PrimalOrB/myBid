//Those actions are imported here, here those actions will update the state

import { useReducer } from "react";
import {
  UPDATE_AUCTIONS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_AUCTIONS:
      return {
        ...state,
        auctions: [...action.auctions],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.auction],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.auctions],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(auction => {
          if (action._id === auction._id) {
            auction.purchaseQuantity = action.purchaseQuantity
          }
          return auction
        })
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(auction => {
        return auction._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    default:
      return state;
  }
};

export function useAuctionReducer(initialState) {
  return useReducer(reducer, initialState)
}