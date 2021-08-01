import React, { useEffect, useState } from 'react'; 
import { paddedNumber, calculateTimeLeft } from '../../utils/helpers'; 

const OwnedBidsCard = ( { bid, auction, user, type }) => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft( auction.endDate ));

    useEffect(() => {
        const timer=setTimeout(() => {
        setTimeLeft(calculateTimeLeft( auction.endDate ));
        }, 1000);
        return () => clearTimeout(timer);
    });

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
              { user === auction.auctionInfo.currentLeader ? <span className='winning'>Auction Won</span> : <span className='losing'>Auction Lost</span>}
              <span className='card-title'>{auction.title} @ <span key={ auction.auctionInfo.currentBid.toFixed(2) } className='bid-value'>${ auction.auctionInfo.currentBid.toFixed(2) }</span></span>
              <div className='card-current'>
              <span>Your Max Bid: <span key={ bid.maxBid.toFixed(2) } className='bid-value'>${ bid.maxBid.toFixed(2) }</span></span>
              { bid.incrementing && 
                  <span>Increment By: <span key={ bid.increment.toFixed(2) } className='bid-value'>${ bid.increment.toFixed(2) }</span></span>
              }
              </div>
              
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
