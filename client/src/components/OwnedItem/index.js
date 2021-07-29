import React, { useEffect, useState } from 'react';
import { paddedNumber, calculateTimeLeft } from '../../utils/helpers';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const OwnedItem = ( { auction } ) => {

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
        </article>
    </>
  );
};
export default OwnedItem;
