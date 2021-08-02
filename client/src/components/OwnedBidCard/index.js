import React, { useEffect, useState, useContext } from 'react'; 
import { paddedNumber, calculateTimeLeft } from '../../utils/helpers'; 
import { useStoreContext } from "../../utils/GlobalState";
// import {StoreProvider} from '../../utils/GlobalState';
import {ADD_MULTIPLE_TO_CART} from '../../utils/actions'



const OwnedBidsCard = ( { bid, auction, user, type }) => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft( auction.endDate ));

    useEffect(() => {
        const timer=setTimeout(() => {
        setTimeLeft(calculateTimeLeft( auction.endDate ));
        }, 1000);
        return () => clearTimeout(timer);
    });
    const [dispatch] = useStoreContext();

    function handleAddCart( auction ) {
     
    dispatch({type: ADD_MULTIPLE_TO_CART, _id: auction._id, payload: auction})

    
      // after payment, we will need to create a dB route which updates the paid status of the auction
    }
  


//Input: {__typename: "Auction", _id: "61075e572425570eea3d7a78", ownerId: "61075dc42425570eea3d7a6c", title: "Ornaments", description: "precious stones", …}
//:{__typename: "Auction", _id: "61022c2ce4fa4908e66087cd", ownerId: "60f8ba21504f3707f3665ef3", title: "cars", description: "new cars", …}







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
