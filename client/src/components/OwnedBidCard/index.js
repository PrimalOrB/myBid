import React, { useEffect, useState } from 'react'; 
import { paddedNumber, calculateTimeLeft } from '../../utils/helpers'; 
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

const OwnedBidsCard = ( { bid, auction, user, type, UPDATE_CART_QUANTITY }) => {

  const [state, dispatch] = useStoreContext();
  
  const { cart } = state;

  console.log( cart )

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft( auction.endDate ));

  useEffect(() => {
      const timer=setTimeout(() => {
      setTimeLeft(calculateTimeLeft( auction.endDate ));
      }, 1000);
      return () => clearTimeout(timer);
  });

  function handleAddCart( auction ) {
      // this is the auction info that will go to the cart. we will not need all of it, probably title, description, _id, and auctionInfo.currentBid (cost))
    const cartItem = { title: auction.title, description: auction.description, price: auction.auctionInfo.currentBid, _id: auction._id, }
      // ensure no duplicated
    const itemInCart = cart.find((cart) => cart._id === auction._id)

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: auction._id,
        purchaseQuantity: 1
      });
      idbPromise('cart', 'put', {
        ...cartItem,
        purchaseQuantity: 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        cart: { ...cartItem, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...cartItem, purchaseQuantity: 1 });
    }
  }

  return (
    <>
    { 
      <>
      { type === 'active' ?
        <>
          <div className='card'>
              { user === auction.auctionInfo.currentLeader ? <span className='winning'>Winning Auction</span> : <span className='losing'>Losing Auction</span>}
              <span className='card-title'>{auction.title} @ <span key={ auction.auctionInfo.currentBid.toFixed(2) } className='bid-value'>${ auction.auctionInfo.currentBid.toFixed(2) }</span></span>
              <div className='card-current'>
              <span>Your Max Bid: <span key={ bid.maxBid.toFixed(2) } className='bid-value'>${ bid.maxBid.toFixed(2) }</span></span>
              { bid.incrementing && 
                  <span>Increment By: <span key={ bid.increment.toFixed(2) } className='bid-value'>${ bid.increment.toFixed(2) }</span></span>
              }
              </div>
              
                <div className="card-status">
                    <span>Time Remaining:
                        <span className='remaining'> { ( timeLeft.days && `${timeLeft.days} days, ` ) }
                        { `${ paddedNumber( timeLeft.hours ) }:${ paddedNumber( timeLeft.minutes ) }:${ paddedNumber( timeLeft.seconds ) }` }
                        </span>        
                    </span>
                    { auction.auctionInfo.reserveMet ? ( 
                        <span className='reserve-met'>Reserve Met</span> 
                        ) : ( 
                        <span className='reserve-not'>Reserve Not Met</span>
                        ) 
                    }
                </div>
                <div className="add-bid">
                    <span><a href={ `/auction/${ auction._id }`} >Bid Again!</a></span>
                </div>
                
          </div>
          </>
          :
          <>
          <div className='card'>
              { user === auction.auctionInfo.currentLeader ? <span className='winning'>Auction Won { !auction.paid ? <span className='pay-status not-paid' onClick={ () => handleAddCart( auction ) }>Pay Now</span> : <span className='pay-status paid'>Paid</span>}</span> : <span className='losing'>Auction Lost</span>}
              <span className='card-title'>{auction.title} @ <span key={ auction.auctionInfo.currentBid.toFixed(2) } className='bid-value'>${ auction.auctionInfo.currentBid.toFixed(2) }</span></span>
              
                <div className="card-status">
                    <span>Auction Ended:
                        <span className='bid-value'>{ new Date( Number( auction.endDate ) ).toLocaleDateString() }
                        </span>        
                    </span>
                    { auction.auctionInfo.reserveMet ? ( 
                        <span className='reserve-met'>Reserve Met</span> 
                        ) : ( 
                        <span className='reserve-not'>Reserve Not Met</span>
                        ) 
                    }
                </div>              
          </div>
          </>
        }
      </>
      }
    </>
  );
};
export default OwnedBidsCard;
