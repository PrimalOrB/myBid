//This page will save the order to the database
//The Success page will display for three seconds, then redirect to the homepage. 
//Before redirecting, it should also clear the cart data from IndexedDB and save the user's order in the 
//app's database.


import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const checkout = await idbPromise('checkout', 'get');
      const auctions = checkout.map((item) => item._id);

      if (auctions.length) {
        const { data } = await addOrder({ variables: { auctions } });
        const auctionData = data.addOrder.auctions;

        auctionData.forEach((item) => {
          idbPromise('checkout', 'delete', item);
        });
      }

//You can use the window.location.assign() method to perform the redirect. 3000 miliseconds or 3 seconds

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;


