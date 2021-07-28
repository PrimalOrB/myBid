
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_AUCTIONS,
} from '../utils/actions';
import { QUERY_AUCTIONS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentAuction, setCurrentAuction] = useState({});

  const { loading, data } = useQuery(QUERY_AUCTIONS);

  const { auctions, cart } = state;

  useEffect(() => {
    // already in global store
    if (auctions.length) {
      setCurrentAuction(auctions.find((auction) => auction._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_AUCTIONS,
        auctions: data.auctions,
      });

      data.auctions.forEach((auction) => {
        idbPromise('auctions', 'put', auction);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('auctions', 'get').then((indexedAuctions) => {
        dispatch({
          type: UPDATE_AUCTIONS,
          auctions: indexedAuctions,
        });
      });
    }
  }, [auctions, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        auction: { ...currentAuction, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentAuction, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentAuction._id,
    });

    idbPromise('cart', 'delete', { ...currentAuction });
  };

  return (
    <>
      {currentAuction && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Auctions</Link>

          <h2>{currentAuction.name}</h2>

          <p>{currentAuction.description}</p>

          <p>
            <strong>Price:</strong>${currentAuction.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentAuction._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentAuction.image}`}
            alt={currentAuction.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;

