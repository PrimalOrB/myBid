import React, { useEffect } from 'react';
import { useStoreContext } from '../utils/GlobalState'
import { useLazyQuery } from '@apollo/client';
import Auth from "../utils/auth";
import CartItem from '../components/CartItem';
import { QUERY_CHECKOUT } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const auctionIds = [];
  
    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        auctionIds.push(item._id);
      }
    });
    getCheckout({
      variables: { auctions: auctionIds }
    });
  }

  return (
    <>
    {state.cart.length ?
      <>
        <h1>Checkout</h1>
        <div className='cart-subtotal'>Total: ${calculateTotal()}</div>
        <ul className='cart-list'>
        { state.cart.map( item => {
          return <CartItem key={ item._id } item={ item }/>
        })}
        </ul>
        {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
          ) : (
            <span>(log in to check out)</span>
          )}
      </>
    :
      <span>You have no auctions requiring payment</span>
    }
    </>
  );
};



export default Cart;