//We're using another test key copied from the Stripe documentation. 
//Because it's only a test key, it's fine to include it directly in the JavaScript file. 
//Once you create a real Stripe account, however, you would want to replace this with an environment 
//variable (e.g., process.env.STRIPE_KEY).
//This stipe key is a test key and real one has to be subscribed for 


//Auth.js both client and server side has been checked
//You will need to setup a globalState page


import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
//importing to get unique session ID for specific product for stripe transaction 
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
// import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';

//3 phases for stripe, another key for a phase, 
//This is the same API key that we used in the plain HTML test, but now we're using it in the context of 
//React. We'll use this stripePromise object to perform the checkout redirect
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Checkout = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  //use of session id for product created by query and passing in above stripePromise to get data back
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

//adding cart items to stripe, the actual happening of transaction is not evident from code, will become
// more evident when actually doing it, chances are stripe will control trasaction part built in 
  useEffect(() => {
    async function getCheckout() {
      const checkout = await idbPromise('checkout', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, auctions: [...checkout] });
    }

    if (!state.checkout.length) {
      getCheckout();
    }
  }, [state.checkout.length, dispatch]);

  function toggleCheckout() {
    dispatch({ type: TOGGLE_CHECKOUT });
  }

  function calculateTotal() {
    let sum = 0;
    state.checkout.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const auctionIds = [];

    state.checkout.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        auctionIds.push(item._id);
      }
    });

    getCheckout({
      variables: { auctions: auctionIds },
    });
  }

  if (!state.checkoutOpen) {
    return (
      <div className="cart-closed" onClick={toggleCheckout}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCheckout}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.checkout.length ? (
        <div>
          {state.chekout.map((item) => (
            <CheckoutItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Checkout;
