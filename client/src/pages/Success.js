import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PAID } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';
import { CLEAR_CART } from "../utils/actions";

function Success() {
  const [updateOrder] = useMutation(UPDATE_PAID);
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    async function saveOrder() {
      const checkout = await idbPromise('cart', 'get');
      const auctions = checkout.map((item) => item._id);

      if (auctions.length) {
        const { data } = await updateOrder({ variables: { ids: auctions } } );
        auctions.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });

        dispatch({ type: CLEAR_CART });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [updateOrder]);

  return (
    <div className='success-container'>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
    </div>
  );
}

export default Success;


