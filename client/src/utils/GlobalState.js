//Global state is creating a context/global state that is importing reducer to update state and pass 
//updated state to other components using provider using props
//for library https://stripe.com/docs/stripe-js
//Installed stripe on client side,  npm i @stripe/stripe-js on client side. 
//you may need stripe install "stripe" server side: "^8.67.0", check mod

import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
