//Global state is creating a context/global state that is importing reducer to update state and pass 
//updated state to other components using provider using props
//for library https://stripe.com/docs/stripe-js
//Installed stripe on client side,  npm i @stripe/stripe-js on client side. 
//you may need stripe install "stripe" server side: "^8.67.0", check mod
//Make sure your indexDB is connected as in the mod code, in helpers (mod 22.3)
//For stripe verification you will need a SSL certificate to prove you are genuine
//Use third party API to calculate shipping and tax cost and not you dealing with many of Stripe functions

//STEPS
//errors, match models with server: typedefs, resolvers, client: queries and mutations
//test stripe on graphql the main query for session id before moving any further with testing, fake data testing
//query checkout($products: [ID]!) {checkout(products: $products) {session}}, you will use product ids
//all stripe mutations have to be checked and then queries, all related to stripe
//front end test

import React, { createContext, useContext } from "react";
import { useAuctionReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAuctionReducer({
    auctions: [],
    cart: [],
    cartOpen: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
