//Global state is creating a context/global state that is importing reducer to update state and pass 
//updated state to other components using provider using props
//for library https://stripe.com/docs/stripe-js
//Installed stripe on client side,  npm i @stripe/stripe-js on client side. 
//you may need stripe install "stripe" server side: "^8.67.0", check mod
//Make sure your indexDB is connected as in the mod code, in helpers (mod 22.3)
//For stripe verification you will need a SSL certificate to prove you are genuine
//Use third party API to calculate shipping and tax cost and not you dealing with many of Stripe functions

//STEPS
//match models with server: typedefs, resolvers, client: queries and mutations
//test stripe on graphql for all above (especially session id)
//fake data testing front end test, price selection connection to cart - appearance of cart and checkout options

import React, { createContext, useContext } from "react";
import { useAuctionReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAuctionReducer({
    cart: []
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
