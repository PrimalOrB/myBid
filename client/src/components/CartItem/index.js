import React, { useEffect } from 'react';

const CartItem = () => {

    useEffect(() => {
      return () => {
        console.log("proceed to checkout");
      };
    }, []);

}


export default CartItem;