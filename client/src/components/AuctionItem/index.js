<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { paddedNumber, calculateTimeLeft } from '../../utils/helpers';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const AuctionItem = ( { auction, addBid } ) => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft( auction.endDate ));

    useEffect(() => {
        const timer=setTimeout(() => {
          setTimeLeft(calculateTimeLeft( auction.endDate ));
        }, 1000);
        return () => clearTimeout(timer);
    });

    const loggedIn = Auth.loggedIn();
    

  return (
    <>
        { timeLeft.seconds > 0 && 
        <article className='card'>
            <span className='card-title'>{ auction.title }</span>
            <span className='card-desc'>{ auction.description }</span>
            <div className='card-current'>
                <div>
                    <span>Current Bid:</span>
                    <span>${ auction.auctionInfo.currentBid.toFixed(2) }</span>
                </div>
                <div>
                    <span>Number Of Bids:</span>
                    <span>{ auction.auctionInfo.bidCount }</span>
                </div>
            </div>
            <div className="card-status">
            { !timeLeft.seconds ? <div className="closed-bid"><span>Auction Ended</span></div> : 
                <span>Time Remaining:
                    <span className='remaining'> { ( timeLeft.days && `${timeLeft.days} days, ` ) }
                    { `${ paddedNumber( timeLeft.hours ) }:${ paddedNumber( timeLeft.minutes ) }:${ paddedNumber( timeLeft.seconds ) }` }
                    </span>        
                </span>
            }
            { auction.auctionInfo.reserveMet ? ( 
                <span className='reserve-met'>Reserve Met</span> 
                ) : ( 
                <span className='reserve-not'>Reserve Not Met</span>
                ) 
            }
            </div>
            { ( loggedIn && addBid) && (
            <div className="add-bid">
                <span><Link to={ `/auction/${ auction._id }`} >Add Bid!</Link></span>
            </div>
            )}
        </article>
        }
    </>
  );
};
=======
import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function AuctionItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        auction: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/auctions/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

>>>>>>> ef84b70fdc565524bba8a823ef62033fb9e96f3a
export default AuctionItem;
